export default function CompletionBadge() {
  return (
    <svg
      className="completion-badge"
      viewBox="0 0 32 32"
      role="img"
      aria-label="Completed all 60 checkpoints"
    >
      <title>Completed all 60 checkpoints</title>
      <path
        d="M10 27C0 23 1 10 8 5m14 22c10-4 9-17 2-22M5 12l4 1M4 18l5-1m-2 7 4-3m16-9-4 1m5 5-5-1m2 7-4-3"
        fill="none"
        stroke="#78845a"
        strokeWidth="2"
      />
      <path
        d="m16 3 3 9 9 4-9 3-3 10-3-10-9-3 9-4Z"
        fill="#c6a05a"
        stroke="#886634"
      />
      <circle cx="16" cy="16" r="3" fill="#f3e4bd" />
    </svg>
  );
}
