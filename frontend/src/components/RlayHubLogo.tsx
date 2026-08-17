// RlayHub lockup. Identical to web/app/RlayHubLogo.tsx by design (see brand.md,
// §4): the logo is not redrawn per site. Single colour, inherits `currentColor`.

export function RlayHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 0 H90 A10 10 0 0 1 100 10 V90 A10 10 0 0 1 90 100 H10 A10 10 0 0 1 0 90 V10 A10 10 0 0 1 10 0 Z
           M24 50 A26 26 0 1 0 76 50 A26 26 0 1 0 24 50 Z
           M29 0 A21 21 0 1 0 71 0 A21 21 0 1 0 29 0 Z
           M79 50 A21 21 0 1 0 121 50 A21 21 0 1 0 79 50 Z
           M29 100 A21 21 0 1 0 71 100 A21 21 0 1 0 29 100 Z
           M-21 50 A21 21 0 1 0 21 50 A21 21 0 1 0 -21 50 Z"
      />
    </svg>
  );
}

export function RlayHubLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`rlayhub${className ? ` ${className}` : ""}`}>
      <RlayHubMark className="rlayhub-mark" />
      {showWordmark && <span className="rlayhub-word">RlayHub</span>}
    </span>
  );
}
