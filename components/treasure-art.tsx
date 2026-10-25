import { useId } from "react";

const newDrawings: Record<string, React.ReactNode> = {
  coin: (
    <>
      <ellipse cx="81" cy="85" rx="46" ry="44" fill="#6f744e" />
      <circle cx="78" cy="79" r="44" fill="#b49358" />
      <circle cx="78" cy="79" r="37" stroke="#dfc589" strokeWidth="2" />
      <circle cx="78" cy="79" r="33" stroke="#7c744c" strokeDasharray="1 5" />
      <path
        d="M78 52v43m-15-31h30M61 78q17 34 34 0l-8 4m-26-4 8 4"
        stroke="#665e3f"
        strokeWidth="3"
      />
      <path d="m48 55 4-5m51 48 5-5M43 78l4 7m46-45 6 4" stroke="#e1ca92" />
      <path d="M43 100q12 17 34 18" stroke="#d6b87a" />
      <path d="m57 49 6 2m33 53-4 6" stroke="#65795d" strokeWidth="3" />
    </>
  ),
  shard: (
    <>
      <path d="m45 48 38-20 30 18 12 50-24 30-56-11-11-40Z" fill="#ac7956" />
      <path d="m46 48 37-16 27 17 10 45-23 25-49-9-9-35Z" fill="#d3bb91" />
      <path
        d="m45 57 56-12m-59 21 70-13m-68 43 71 9m-68-1 62 10"
        stroke="#537b85"
        strokeWidth="4"
      />
      <path
        d="m53 78 8-9 10 13 10-15 11 13 10-12 9 17"
        stroke="#47717d"
        strokeWidth="3"
      />
      <path d="m83 32-8 22 4 15m40 25-18-7-4-14M45 48l5 9" stroke="#f0dab1" />
      <path d="m49 109 48 10 23-25" stroke="#835b40" />
    </>
  ),
  arrowhead: (
    <>
      <path
        d="m79 24 9 14 4 1 3 13 5 3 2 12 7 5 1 13 9 15-21 5-5 12 5 15H65l5-15-7-12-21-5 9-16 2-13 7-5 2-13 7-4 3-14Z"
        fill="#77837b"
      />
      <path d="m79 24-8 71 8 19 10-19Z" fill="#aab0a2" />
      <path
        d="m79 24 7 24 6 4-19 12 27 3-29 15 39 3-39 10-25 3m43-3 23 5m-33 14v13"
        stroke="#d2d0b7"
      />
      <path
        d="m69 49 8 5m-18 17 11 4m22 5 10-5m-37 31 9 8m17-8-6 9"
        stroke="#465b52"
      />
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
      <path
        d="M65 42V29a15 15 0 0 1 30 0v13"
        stroke="#705c3c"
        strokeWidth="4"
      />
      <path d="M65 40V29a15 15 0 0 1 30 0" stroke="#bda16a" />
      <path d="M55 55h50l-5 62H60Z" fill="#d1aa60" />
      <path d="M62 61h36l-4 48H66Z" fill="#efd195" />
      <path
        d="M73 103q-10-13 7-35-2 14 6 19 9 15-5 17Z"
        fill="#bd7845"
        stroke="#b48545"
      />
      <path d="M77 101q-5-8 3-15 9 14 1 16Z" fill="#f9e3a8" stroke="none" />
      <path d="M52 50h56v8H52Zm6 65h44v8H58Zm-5 8h54l5 9H48Z" fill="#8f7549" />
      <path d="m54 50 14-12h24l14 12Z" fill="#b89b5f" />
      <path
        d="m61 58 4 56m34-56-4 56M80 58v56M61 88h38"
        stroke="#8f7549"
        strokeWidth="3"
      />
      <path d="M60 53h40m-43 73h46" stroke="#dec28a" />
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
      <circle cx="80" cy="24" r="10" fill="#ad8c4e" />
      <circle cx="80" cy="24" r="5" fill="#e5d7b2" />
      <path d="M74 34h12v10H74Z" fill="#a78445" />
      <circle cx="80" cy="87" r="46" fill="#b29454" />
      <circle cx="80" cy="87" r="39" fill="#dbca94" />
      <circle cx="80" cy="87" r="34" stroke="#796d45" strokeDasharray="1 4" />
      <path
        d="M48 96a34 34 0 0 1 64 0M51 105a34 34 0 0 1 58 0M80 53v68M46 87h68"
        stroke="#a1905c"
      />
      <circle cx="80" cy="87" r="24" stroke="#6e7d64" />
      <path
        d="M80 63 92 83 106 89 88 96 80 111 73 94 54 87 72 80Z"
        stroke="#69765a"
      />
      <g transform="rotate(35 80 87)">
        <path d="M77 49h6v76h-6Z" fill="#ac8444" />
        <path d="M73 51h14v7H73Zm0 65h14v7H73Z" fill="#dfc38b" />
      </g>
      <circle cx="80" cy="87" r="5" fill="#6b704d" />
      <circle cx="80" cy="87" r="2" fill="#ead49b" />
      <path d="M51 118q14 12 30 12" stroke="#e4cd91" />
    </>
  ),
  mask: (
    <>
      <path
        d="M45 41 62 29h36l17 12 4 30-9 35-18 22H68l-18-22-9-35Z"
        fill="#333f40"
      />
      <path
        d="m45 41 18 11 17-16 18 16 17-11-5 29-14 10 10 23-15 21-11-15-12 15-15-21 12-23-15-10Z"
        fill="#526367"
      />
      <path
        d="m63 52 17 12 18-12-8 31 9 19-19 10-19-10 10-19Z"
        fill="#263638"
      />
      <path d="m49 65 9-5 17 11-17 8Zm62 0-9-5-17 11 17 8Z" fill="#77a5a0" />
      <path d="m55 69 15 4m35-4-15 4" stroke="#142f34" strokeWidth="3" />
      <path d="m80 66-7 27h14Zm-11 37q11-5 22 0l-5 8H74Z" fill="#788178" />
      <path
        d="M62 34h36M48 43l10 14m54-14-10 14M53 92l6 9m48-9-6 9m-25 17h8"
        stroke="#bec1a0"
      />
      <path d="m45 83 5 4m65-4-5 4" stroke="#c49c57" strokeWidth="3" />
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
      <circle cx="80" cy="24" r="10" fill="#b59351" />
      <circle cx="80" cy="24" r="5" fill="#e5d7b2" />
      <path d="M74 33h12v9H74Z" fill="#b59351" />
      <circle cx="80" cy="86" r="46" fill="#9b713e" />
      <circle cx="80" cy="84" r="44" fill="#caa65f" />
      <circle
        cx="80"
        cy="84"
        r="38"
        fill="#985b42"
        stroke="#ebd29a"
        strokeWidth="2"
      />
      <path
        d="M77 88Q57 81 47 58q-2 24 16 39-17-2-22-18 2 24 29 29l-8 14 18-10 18 10-8-14q27-5 29-29-5 16-22 18 18-15 16-39-10 23-30 30Z"
        fill="#e7c67c"
      />
      <path
        d="M74 96q9-17 4-28-3-9 4-13 8-4 12 2l-9 2 8 5-9 1q10 17 0 33Z"
        fill="#edcf8c"
      />
      <path
        d="M80 108v15m-7-15-5 9m19-9 5 9M50 69l19 26M110 69 91 95M47 84l20 16m46-16-20 16"
        stroke="#9d6e39"
      />
      <circle cx="85" cy="57" r="1.5" fill="#564233" stroke="none" />
      <path d="m80 93 6 8-6 8-6-8Z" fill="#b75444" />
      <path d="M48 111q13 13 29 14" stroke="#edcf8c" />
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
