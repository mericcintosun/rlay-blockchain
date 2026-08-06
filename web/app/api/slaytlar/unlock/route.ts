import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This handler is the only place the slide passcode exists. It is read from the
// server environment, never sent to the browser, and never written into the repo.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "slides_unlocked";
const COOKIE_MAX_AGE = 60 * 60 * 12; // one camp day

// Best-effort brute-force damping. Serverless instances are short-lived, so this
// slows an attacker down rather than stopping one outright - acceptable for a
// projector gate, not a substitute for a real secret.
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 60_000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

function secret(): string | null {
  const value = process.env.SLIDE_PASSCODE;
  return value && value.length > 0 ? value : null;
}

/** Cookie value the browser gets after a correct passcode. Not reversible. */
function token(key: string): string {
  return createHmac("sha256", key).update("slides-unlocked-v1").digest("hex");
}

function equals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Called on page load to see whether this browser is already unlocked. */
export async function GET() {
  const key = secret();
  if (!key) {
    return NextResponse.json({ unlocked: false, configured: false });
  }
  const jar = await cookies();
  const current = jar.get(COOKIE)?.value ?? "";
  return NextResponse.json({
    unlocked: current.length > 0 && equals(current, token(key)),
    configured: true,
  });
}

export async function POST(request: Request) {
  const key = secret();

  // Fail closed. Without the environment variable nothing unlocks.
  if (!key) {
    return NextResponse.json(
      { ok: false, configured: false, error: "SLIDE_PASSCODE tanımlı değil." },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { ok: false, error: "Çok fazla deneme. Bir dakika bekle." },
      { status: 429 },
    );
  }

  let code = "";
  try {
    const body = (await request.json()) as { code?: unknown };
    code = typeof body.code === "string" ? body.code.trim() : "";
  } catch {
    code = "";
  }

  // Constant delay on every answer so timing does not leak correctness.
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!equals(code, key)) {
    return NextResponse.json({ ok: false, error: "Kod yanlış." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(COOKIE, token(key), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
