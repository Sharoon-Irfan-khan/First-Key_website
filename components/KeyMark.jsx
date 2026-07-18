// Signature device: a small key derived from the FK monogram.
// Used inline in eyebrows, list bullets, and dividers.
export default function KeyMark({ size = 34, className = "" }) {
  return (
    <svg
      className={`keymark ${className}`}
      width={size}
      height={(size * 16) / 40}
      viewBox="0 0 40 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="6.5" cy="8" r="5" />
      <circle cx="6.5" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <line x1="11.5" y1="8" x2="38" y2="8" />
      <line x1="31" y1="8" x2="31" y2="12.5" />
      <line x1="35" y1="8" x2="35" y2="11.5" />
    </svg>
  );
}
