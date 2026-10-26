export default function CompletionBadge() {
  return (
    <svg
      className="completion-badge"
      viewBox="0 0 36 36"
      role="img"
      aria-label="Completed all 60 checkpoints"
    >
      <title>Completed all 60 checkpoints</title>
      <g
        fill="none"
        stroke="#738361"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 32C3 28 1 16 8 7M24 32c9-4 11-16 4-25M6 12l4 2M5 19l5-1m-3 8 5-3m18-11-4 2m5 5-5-1m3 8-5-3" />
      </g>
      <circle
        cx="18"
        cy="18"
        r="11"
        fill="#ddc58c"
        stroke="#9b7b40"
        strokeWidth="1"
      />
      <path
        d="m18 8 2.7 7.3L28 18l-7.3 2.7L18 28l-2.7-7.3L8 18l7.3-2.7Z"
        fill="#ab8347"
        stroke="#7b663b"
        strokeWidth=".7"
      />
      <path
        d="M18 8v10h-2.7ZM28 18H18v2.7ZM18 28V18h2.7ZM8 18h10v-2.7Z"
        fill="#f4e6b9"
        stroke="none"
      />
      <circle cx="18" cy="18" r="2.4" fill="#6c805d" />
    </svg>
  );
}
