// RlayHub lockup. Single colour: it inherits `currentColor`, so the same
// component renders white on purple and purple on paper - the rule from the
// brand guide. Swap `Mark` if you have the original vector.

export function RlayHubMark({ className }: { className?: string }) {
  return (
    // One path, evenodd: a rounded square with four circles punched out of its
    // edges, leaving the four arms. No <mask> and no id, so it cannot break when
    // the logo appears more than once on a page or inside a hidden subtree.
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
