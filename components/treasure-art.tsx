import { useId } from "react";

const newDrawings: Record<string, React.ReactNode> = {
  coin: (
    <>
      <circle cx="80" cy="81" r="45" fill="#b68b50" />
      <circle cx="80" cy="81" r="37" stroke="#e9d49e" strokeDasharray="2 4" />
      <path
        d="m80 53 10 20 22 3-16 16 4 23-20-11-20 11 4-23-16-16 22-3Z"
        fill="#d9ba78"
      />
      <path d="M44 111q12 17 36 19" stroke="#e6cb8c" />
    </>
  ),
  shard: (
    <>
      <path d="m37 54 44-28 34 20 14 58-48 31-39-21Z" fill="#8caeb3" />
      <path d="m37 54 24 7-5 33 25 41m0-109 11 29 23-9" stroke="#d8d4af" />
      <path
        d="m57 68 13 8 15-15 15 9 12-10m-54 40 17-11 13 12 25-12"
        stroke="#355e6c"
        strokeWidth="5"
      />
    </>
  ),
  arrowhead: (
    <>
      <path d="m80 24 40 85-26-5v24H65v-24l-25 5Z" fill="#949b91" />
      <path
        d="m80 24-8 76 22 4m-50 1 28-5-7 28m15-91 19 34-22-7m-4 19 33 5"
        stroke="#d2d3bd"
      />
      <path d="m80 24-15 30-4-1-6 16 2 3-12 28" stroke="#525d54" />
    </>
  ),
  bead: (
    <>
      <path
        d="M74 43q-35-38-46 4-9 52 49 78 49-19 55-49 5-21-17-35"
        stroke="#a18b60"
        strokeWidth="3"
      />
      <ellipse cx="80" cy="82" rx="31" ry="36" fill="#ba784e" />
      <ellipse cx="80" cy="52" rx="9" ry="6" fill="#584739" />
      <path d="M65 67q-12 24 5 40m11-45v44m12-35q9 14 0 28" stroke="#e0aa72" />
      <path d="M80 34v19" stroke="#c9b887" strokeWidth="3" />
    </>
  ),
  button: (
    <>
      <circle cx="80" cy="83" r="41" fill="#b69b64" />
      <circle cx="80" cy="83" r="34" stroke="#e4c98e" />
      <circle cx="80" cy="63" r="7" />
      <path
        d="M80 70v37m-14-27h28m-36 10q22 41 44 0l-10 4m-34-4 10 4"
        stroke="#63583b"
        strokeWidth="3"
      />
      <path d="M48 66q-7 20 0 34" stroke="#efd9a3" />
    </>
  ),
  key: (
    <>
      <circle cx="78" cy="48" r="18" fill="#7a8174" />
      <circle cx="78" cy="48" r="10" fill="#e6d7b2" />
      <path d="M73 65h10v66H73Zm10 44h18v8h-9v12h-9Z" fill="#7a8174" />
      <path d="M77 68v57m8-13h11" stroke="#c1b891" />
      <path d="M66 35q-14-12-16 2t12 18m28-20q14-12 16 2T94 55" />
    </>
  ),
  shell: (
    <>
      <path
        d="M80 117Q10 98 30 54q7-17 22-7 12-27 28-8 16-19 28 8 15-10 22 7 20 44-50 63Z"
        fill="#c5a99b"
      />
      <path
        d="m80 117-28-70m28 70V39m0 78 28-70m-28 70L30 60m50 57 50-57"
        stroke="#ede0bd"
      />
      <path d="M47 97q33-24 66 0-32 32-66 0Z" fill="#e5d5bd" />
      <circle cx="80" cy="95" r="14" fill="#f2e9ce" />
      <path d="m74 88 5-2" stroke="white" strokeWidth="3" />
    </>
  ),
  lantern: (
    <>
      <path d="M65 38V27q15-22 30 0v11M52 49h56l-5 75H57Z" fill="#bc9148" />
      <path d="M60 58h40v53H60Z" fill="#d7a558" />
      <path
        d="M71 48v66m18-66v66M58 81h44m-46 35h48M51 44l29-16 29 16Z"
        fill="#a68045"
      />
      <path d="M71 102q-7-17 9-30 11 16 5 29Z" fill="#f0d18a" />
      <path d="M54 126h52l6 7H48Z" fill="#8c714a" />
    </>
  ),
  tablet: (
    <>
      <path d="m44 30 71 5 6 88-15 10-66-4-6-83Z" fill="#b88860" />
      <path d="m44 30 3 90 74 3m-13-82 5 70" stroke="#ddba89" />
      <path
        d="m56 51 14 13 18-13 13 22-26 19-19-13m14-15 5 28m13-41 6 42m-36 17h44"
        stroke="#765439"
      />
      <circle cx="70" cy="64" r="3" fill="#765439" />
      <circle cx="88" cy="51" r="3" fill="#765439" />
    </>
  ),
  astrolabe: (
    <>
      <path d="M71 32V21q9-12 18 0v11" stroke="#9d7b42" strokeWidth="5" />
      <circle cx="80" cy="82" r="49" fill="#b99b58" />
      <circle cx="80" cy="82" r="41" fill="#dfcd94" />
      <circle cx="80" cy="82" r="33" strokeDasharray="1 4" />
      <path
        d="M49 105 99 49m-50 56 24-5 26-51-23 10Zm-18-9q28-38 52 0m-60 30q36-39 70-4M80 44v76M43 82h74"
        stroke="#66765a"
      />
      <circle cx="80" cy="82" r="5" fill="#9d7b42" />
    </>
  ),
  mask: (
    <>
      <path d="M40 38q40-25 80 0l-8 65-32 32-32-32Z" fill="#454e4b" />
      <path
        d="M49 58q15-12 28 4L56 75Zm34 4q14-16 28-4l-7 17Z"
        fill="#7ca5a0"
      />
      <path
        d="M80 57 69 91l21 1m-25 16q15 9 30 0M46 43l10 55 24 26 24-26 10-55"
        stroke="#9b9c7d"
      />
      <path d="M65 115h30" stroke="#b88d59" />
    </>
  ),
  dagger: (
    <>
      <path d="m80 17 16 75-16 18-16-18Z" fill="#a5b9ba" />
      <path d="M80 17v93m0-78 10 57-10 9" stroke="#edf0dc" />
      <path d="M55 100h50v8H55Zm19 8h12v28H74Z" fill="#b99a57" />
      <path
        d="m74 113 12 6-12 5 12 6m-15 7h18"
        stroke="#675139"
        strokeWidth="2"
      />
    </>
  ),
  brooch: (
    <>
      <path
        d="M32 93q20-57 54-45 23-14 36 4l19 3-24 9q-9 49-53 41l-29 24 11-29Z"
        fill="#5c9296"
      />
      <path d="M47 88q26-38 52-13L70 99Z" fill="#3e6c83" />
      <path
        d="m70 99-28 17m46-15-4 26m6-5h12M100 54h6"
        stroke="#d9bc7b"
        strokeWidth="2"
      />
      <path d="m117 59 24-4-22 11" fill="#cecbb1" />
      <circle cx="108" cy="53" r="2" fill="#222f30" />
    </>
  ),
  idol: (
    <>
      <path
        d="M60 70q-17 9-21 37l18 7 4-19-4 35h46l-4-35 4 19 18-7q-4-28-21-37Z"
        fill="#588474"
      />
      <path d="M58 37 80 22l22 15-6 37H64Z" fill="#76a087" />
      <path
        d="M67 47h9m9 0h8M80 49l-4 12h8m-14 7h20M61 87l19 13 19-13M65 115h30m-15-15v27"
        stroke="#d0cc9c"
        strokeWidth="2"
      />
      <path d="M51 134h58" stroke="#9a895c" strokeWidth="4" />
    </>
  ),
  chalice: (
    <>
      <path
        d="M41 40h78q-2 47-33 53v25h17l9 14H48l9-14h17V93q-31-6-33-53Z"
        fill="#a8aeb1"
      />
      <ellipse cx="80" cy="40" rx="39" ry="10" fill="#d1c9b3" />
      <ellipse cx="80" cy="40" rx="31" ry="5" fill="#716678" />
      <path
        d="M49 56q31 11 62 0m-57 7q5 20 22 23m4 8v26m-20 6h40"
        stroke="#e6dfc5"
      />
      {[57, 80, 103].map((x) => (
        <path key={x} d={`m${x} 52 5 7-5 7-5-7Z`} fill="#80728b" />
      ))}
    </>
  ),
  orb: (
    <>
      <circle cx="80" cy="70" r="40" fill="#6d95a8" />
      <path
        d="M51 48q25-26 48-4M50 84q30 17 58-9M65 34q-16 34 15 75m10-76q26 33-10 76"
        stroke="#b6ccd0"
      />
      <path
        d="M42 65q-3 48 38 57 41-9 38-57M80 122v13m-22 1h44"
        stroke="#ab8f54"
        strokeWidth="4"
      />
      <path d="m86 46-13 23h15L74 92" stroke="#e5e4cb" strokeWidth="2" />
    </>
  ),
  lyre: (
    <>
      <path
        d="M45 33q-20 48 8 72l14 22h26l14-22q28-24 8-72l-12 6q15 45-11 48H68Q42 84 57 39Z"
        fill="#bd9a51"
      />
      <path d="M48 39h64M60 94h40m-36 8h32" stroke="#d6c18b" strokeWidth="4" />
      {[62, 68, 74, 80, 86, 92, 98].map((x) => (
        <path key={x} d={`M${x} 42v46`} stroke="#77654c" strokeWidth=".8" />
      ))}
      <path d="m51 33-7-8m65 8 7-8" />
    </>
  ),
  phoenix: (
    <>
      <path d="M71 33V22q9-11 18 0v11" stroke="#b78a40" strokeWidth="4" />
      <circle cx="80" cy="83" r="48" fill="#caa65a" />
      <circle cx="80" cy="83" r="41" stroke="#ebd59b" />
      <path
        d="m80 109-17 16 4-25Q35 93 43 59l27 21-4-24 15 12 14-20 1 25 25-18q5 34-29 47l4 24Z"
        fill="#e0bd6a"
      />
      <path
        d="m45 66 22 21m48-23-23 24M74 68l6 22 7-11m-7 11-6 14h13"
        stroke="#9b6e39"
      />
      <path d="m80 83 7 12-7 12-7-12Z" fill="#a85744" />
    </>
  ),
};

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
      {newDrawings[kind] ? <g>{newDrawings[kind]}</g> : null}
      <path d="M17 145h16m94 0h16" stroke="#b7a77c" strokeWidth=".7" />
    </svg>
  );
}
