import { useId } from "react";

/** Engraved specimen drawings, shared by the cabinet, rewards, and trade offers. */
export default function TreasureArt({
  kind,
  className = "",
}: {
  kind: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`specimen-art ${className}`}
      viewBox="0 0 160 160"
      aria-hidden="true"
      fill="none"
      stroke="#564b35"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient
          id={`${id}-metal`}
          x1="30"
          y1="20"
          x2="125"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ead39a" />
          <stop offset=".48" stopColor="#b38c47" />
          <stop offset="1" stopColor="#7c5e35" />
        </linearGradient>
        <linearGradient
          id={`${id}-jade`}
          x1="40"
          y1="30"
          x2="115"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#abc3a0" />
          <stop offset=".5" stopColor="#587d68" />
          <stop offset="1" stopColor="#2e554e" />
        </linearGradient>
        <linearGradient
          id={`${id}-clay`}
          x1="50"
          y1="40"
          x2="110"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d39964" />
          <stop offset=".5" stopColor="#b66d47" />
          <stop offset="1" stopColor="#794735" />
        </linearGradient>
        <pattern
          id={`${id}-hatch`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 0V5" stroke="#433b2e" strokeWidth=".65" opacity=".25" />
        </pattern>
      </defs>
      <ellipse
        cx="80"
        cy="140"
        rx="43"
        ry="4"
        fill="#5f5136"
        opacity=".09"
        stroke="none"
      />
      {kind === "compass" ? (
        <g>
          <path d="M70 29V19q10-10 20 0v10" strokeWidth="4" stroke="#95743d" />
          <circle cx="80" cy="84" r="53" fill={`url(#${id}-metal)`} />
          <circle cx="80" cy="84" r="46" fill="#eee1b9" />
          <circle
            cx="80"
            cy="84"
            r="41"
            stroke="#927d53"
            strokeDasharray="1 5"
          />
          <circle cx="80" cy="84" r="34" stroke="#c3af7f" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <g key={a} transform={`rotate(${a} 80 84)`}>
              <path
                d="M80 48L85 84 80 120 75 84Z"
                fill={a % 90 === 0 ? "#7b8566" : "#c7bb95"}
                strokeWidth=".7"
              />
            </g>
          ))}
          <path d="M80 49L86 84H80Z" fill="#a9543f" />
          <circle cx="80" cy="84" r="4" fill="#e2cc90" />
          <path
            d="M77 44v-7l6 7v-7M76 127h8M122 81v6m-84-6v6"
            strokeWidth="1"
          />
          <path d="M38 111q13 22 37 25M44 117q13 15 28 17" stroke="#ead8a7" />
        </g>
      ) : null}
      {kind === "scarab" ? (
        <g>
          <path
            d="M56 66L33 49l-8 10m31 20L25 76l-7 12m40 5L32 111l-2 14m74-59 23-17 8 10m-31 20 31-3 7 12m-40 5 26 18 2 14"
            stroke="#8e7545"
            strokeWidth="3"
          />
          <path d="M60 53q-8-23 20-29 28 6 20 29" fill={`url(#${id}-metal)`} />
          <ellipse cx="80" cy="85" rx="32" ry="43" fill={`url(#${id}-jade)`} />
          <path
            d="M80 43v85M51 70q29 17 58 0M55 109q25-17 50 0"
            stroke="#c2cc9a"
          />
          <path
            d="M57 78q-5 30 18 42M103 78q5 30-18 42M63 85l8 8m-8 3 8 8m26-19-8 8m8 3-8 8"
            stroke="#294b41"
          />
          <path
            d="M67 38L57 25m36 13 10-13M70 51q10 7 20 0"
            stroke="#695f39"
            strokeWidth="2"
          />
          <circle cx="71" cy="38" r="2" fill="#3e513b" />
          <circle cx="89" cy="38" r="2" fill="#3e513b" />
        </g>
      ) : null}
      {kind === "vase" ? (
        <g>
          <path
            d="M59 52Q25 38 34 80q5 16 25 14m42-42q34-14 25 28-5 16-25 14"
            stroke="#9e603e"
            strokeWidth="8"
          />
          <path
            d="M59 52Q29 42 39 77q4 11 15 12m47-37q30-10 20 25-4 11-15 12"
            stroke="#deab76"
            strokeWidth="2"
          />
          <path
            d="M61 25h38l-5 36q31 32 16 57-9 15-20 15H70q-11 0-20-15-15-25 16-57Z"
            fill={`url(#${id}-clay)`}
          />
          <path d="M59 25q21-6 42 0v7H59Z" fill="#e2b67d" />
          <path
            d="M58 75q22 5 44 0M48 96q32 8 64 0M54 119q26 7 52 0"
            stroke="#e8bd83"
            strokeWidth="4"
          />
          <path
            d="M59 86h8v7h8v-7h9v7h9v-7h9M64 108l7-5 8 6 8-6 8 5M72 44h16m-17 5h18"
            stroke="#553c30"
          />
          <path d="M68 135h24l7 5H61Z" fill="#926244" />
        </g>
      ) : null}
      {kind === "gem" ? (
        <g>
          <path d="M54 31h52l28 43-54 61L26 74Z" fill={`url(#${id}-jade)`} />
          <path
            d="M54 31L62 72l18 63 18-63 8-41M26 74l36-2 18-41 18 41 36 2M62 72h36"
            stroke="#b9cba3"
          />
          <path
            d="M54 31L26 74l36-2ZM98 72l36 2-54 61Z"
            fill="#163e36"
            opacity=".5"
          />
          <path d="M62 72l18-41 18 41Z" fill="#d0d8ae" opacity=".5" />
          <path d="M44 37l-8 10m-2 6-4 5M115 97l-14 16" stroke="#9b7e47" />
          <path d="M71 19q9-9 18 0m-9-6v10" stroke="#b19b6f" />
        </g>
      ) : null}
      {kind === "moon" ? (
        <g>
          <path
            d="M55 34q25-20 50 0l15 47-20 48H60L40 81Z"
            fill="#bec7c3"
            stroke="#687c7c"
          />
          <path
            d="M55 34l25 17 25-17M40 81l40-30 40 30-40 48ZM80 51v78M55 34L40 81l20 48m45-95 15 47-20 48"
            stroke="#edf0db"
          />
          <path
            d="M91 65q-25 6-15 29 9 13 23 5-28 1-8-34Z"
            fill="#ece9ce"
            stroke="#9da593"
          />
          <path
            d="M53 134q27 11 54 0M57 138q23 9 46 0"
            stroke="#9c8655"
            strokeWidth="3"
          />
          <path d="M50 28l-5-7m65 7 5-7m-35-7v-7" stroke="#b6aa81" />
        </g>
      ) : null}
      {kind === "crown" || kind === "seal" ? (
        <g>
          <path
            d="M31 61l22 21 27-42 27 42 22-21-11 62H42Z"
            fill={`url(#${id}-metal)`}
          />
          <path d="M42 110h76v17H42Z" fill="#c5a05b" />
          <path
            d="M45 116h70M46 122h68M47 102l-8-27m74 27 8-27"
            stroke="#ead6a2"
          />
          <path d="M80 53l10 24-10 13-10-13Z" fill="#5e7b62" />
          <circle cx="53" cy="91" r="5" fill="#a7533d" />
          <circle cx="107" cy="91" r="5" fill="#a7533d" />
          <circle cx="30" cy="58" r="5" fill="#d3b472" />
          <circle cx="80" cy="36" r="6" fill="#d3b472" />
          <circle cx="130" cy="58" r="5" fill="#d3b472" />
          <path d="M65 21l-3-7m36 7 3-7M80 19V9" stroke="#ab945d" />
        </g>
      ) : null}
      {kind === "satchel" ? (
        <g>
          <path d="M51 51V30q29-26 58 0v21" stroke="#624631" strokeWidth="8" />
          <path d="M50 50V32q30-24 60 0v18" stroke="#b28c5e" strokeWidth="3" />
          <path d="M29 57q51-14 102 0l-4 72q-47 14-94 0Z" fill="#8e6345" />
          <path d="M29 57q51-17 102 0l-6 35q-45 13-90 0Z" fill="#b08b5e" />
          <path
            d="M39 63q41-10 82 0M39 124q41 11 82 0"
            stroke="#d7bb8c"
            strokeDasharray="2 4"
          />
          <path d="M55 58v66m50-66v66" stroke="#664a34" strokeWidth="9" />
          <rect x="49" y="87" width="12" height="17" rx="2" fill="#c5a267" />
          <rect x="99" y="87" width="12" height="17" rx="2" fill="#c5a267" />
          <path d="M55 90v11m50-11v11" stroke="#645236" />
          <path d="M68 39l13-23 21 14-10 18" fill="#e5d7ac" />
          <path d="M80 23l14 10m-17-4 14 10" stroke="#a69b77" />
        </g>
      ) : null}
      <path d="M17 145h16m94 0h16" stroke="#b7a77c" strokeWidth=".7" />
    </svg>
  );
}
