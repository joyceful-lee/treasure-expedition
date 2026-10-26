import { useId } from "react";

const newDrawings: Record<string, React.ReactNode> = {
  coin: (
    <>
      <ellipse cx="82" cy="85" rx="45" ry="44" fill="#79684c" />
      <circle cx="78" cy="80" r="44" fill="#b78354" />
      <circle cx="78" cy="80" r="38" fill="#c69661" stroke="#e1bd83" />
      <circle cx="78" cy="80" r="33" stroke="#876541" strokeDasharray="1 4" />
      <path d="M54 89q25 11 49-2L91 102H65Z" fill="#876b48" />
      <path d="M77 86V55M73 59 58 82h15Zm8-1 15 23H81Z" fill="#ddba7b" />
      <path
        d="M54 107q10-4 20 0t21-1m-31 7q9-3 20 0"
        fill="none"
        stroke="#755f41"
      />
      <path
        d="m48 57 5-4m52 35 3-6M48 100l7 5"
        stroke="#688374"
        strokeWidth="3"
      />
      <path d="M45 70q-3 17 4 28" stroke="#e5c68c" />
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
        d="M66 50Q39 17 30 44q-9 26 27 53m35 1q37-31 35-53-2-21-24-10"
        fill="none"
        stroke="#a88d61"
        strokeWidth="2.5"
      />
      <path
        d="M56 58q23-18 46 1l12 43q-9 29-35 27-24-1-33-24Z"
        fill="#ae6d49"
      />
      <path
        d="M58 60q21-14 42 0l8 39q-14 24-48 13l-9-10Z"
        fill="#c38758"
        stroke="none"
      />
      <ellipse cx="79" cy="58" rx="22" ry="10" fill="#d39c6b" />
      <ellipse cx="79" cy="58" rx="9" ry="5" fill="#684735" />
      <path d="M79 43v16m-3-15 3 5 4-5" stroke="#d1b682" strokeWidth="2" />
      <path
        d="M53 82q27 14 54-1m-52 6q25 13 51 0M62 68q-7 20 1 35m33-34q7 19-1 34"
        stroke="#e1ad77"
      />
      <path d="m68 118 7 3m16-4 5-3" stroke="#82553c" />
    </>
  ),
  button: (
    <>
      <ellipse cx="82" cy="89" rx="39" ry="37" fill="#756b4d" />
      <circle cx="79" cy="78" r="39" fill="#bc9b60" />
      <circle cx="79" cy="78" r="33" fill="#d0b47b" stroke="#e4cc97" />
      <circle cx="79" cy="78" r="28" stroke="#917a4e" strokeDasharray="1 3" />
      <circle
        cx="79"
        cy="59"
        r="5"
        fill="none"
        stroke="#786740"
        strokeWidth="2"
      />
      <path
        d="M79 64v30M67 72h24M62 81q17 31 34 0l-8 5m-26-5 8 5"
        fill="none"
        stroke="#786740"
        strokeWidth="2.5"
      />
      <ellipse cx="70" cy="114" rx="3" ry="2" fill="#514c38" />
      <ellipse cx="88" cy="114" rx="3" ry="2" fill="#514c38" />
      <path d="m70 114 8 10 10-10m-18 0 10 6 8-6" stroke="#d9c8a0" />
      <path d="M50 65q-4 12 0 23M91 49l7 4" stroke="#f0dbab" />
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
      <path d="m45 31 61-3 14 11 3 78-13 16-64-2-12-14 1-72Z" fill="#a9734f" />
      <path d="m47 33 58-2 11 10 3 75-12 12-58-2-10-10 1-69Z" fill="#c08d62" />
      <path d="M47 42h57m-58 74 55 2M43 49l-1 55" stroke="#ddba88" />
      <path
        d="m55 87 14-24 20-12 18 28-22 23-30-15m14-24 16 39m4-51-4 51"
        stroke="#805c42"
        strokeWidth="2.5"
      />
      <path
        d="m54 85 14-24 20-12 18 28-22 23-30-15"
        stroke="#deb184"
        strokeWidth=".8"
      />
      {[
        [55, 87],
        [69, 63],
        [89, 51],
        [107, 79],
        [85, 102],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="#825c40" stroke="none" />
          <path d={`M${x - 2} ${y + 2}h3`} stroke="#dfb386" />
        </g>
      ))}
      <path d="m48 107 4 3m51-64 5 3m-8 64 5-2" stroke="#8c694b" />
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
        d="M44 108q-6-21 9-39 14-18 37-13 9-18 26-8l17 9-18 7q2 23-18 35l-28 8-27 26 7-26Z"
        fill="#4c8c91"
      />
      <path d="M60 75q21-16 33-1-1 24-28 30l-13 17 10-25Z" fill="#326678" />
      <path d="M93 66q20 7 11 23-7 12-20 13l-13 4 9-26Z" fill="#c8844d" />
      <path d="M109 54 139 59 114 64" fill="#c9baa0" />
      <path
        d="M63 76q14-11 25-5m-28 14 22-10m-20 19 18-11m-27 39 13-16M87 105l-4 13m13-17-2 17"
        stroke="#9eb5a2"
      />
      <path d="M55 120h55m-10-3 8 3-8 3" stroke="#ba9655" strokeWidth="2" />
      <circle cx="110" cy="53" r="2.5" fill="#233a3d" />
      <path d="m101 55 6 4" stroke="#e6d5ab" strokeWidth="2" />
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
      <path d="M57 115h46l7 18H50Z" fill="#ab8b51" />
      <ellipse cx="80" cy="135" rx="33" ry="5" fill="#b89c62" />
      <circle cx="80" cy="71" r="40" fill="#6c91a1" stroke="#5c7680" />
      <path
        d="M45 67q6-30 35-32 31 0 36 30-24-19-36 4-20-13-35-2Z"
        fill="#9fb6bd"
        stroke="none"
      />
      <path
        d="M50 75q3-13 16-10 4-15 18-9 12-11 22 2 13 1 10 15H50Z"
        fill="#617c8d"
        stroke="none"
      />
      <path d="m85 70-13 17h12l-10 16" stroke="#e9e2b9" strokeWidth="2" />
      <path
        d="M53 48q11-13 27-13m-30 20-2 8m10 28q8 9 20 10"
        stroke="#dbe4d5"
        strokeWidth="2"
      />
      <path
        d="M44 80q2 37 36 42 34-5 36-42m-36 30v15"
        fill="none"
        stroke="#b4995a"
        strokeWidth="4"
      />
      <path d="M48 94q32 21 64 0" stroke="#dec18a" fill="none" />
      <circle cx="80" cy="121" r="4" fill="#dac18c" />
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
            d="m55 66-20-9-10 8m28 12-27 4-8 13m38-2-25 16-2 15m76-57 20-9 10 8m-28 12 27 4 8 13m-38-2 25 16 2 15"
            fill="none"
            stroke="#987b47"
            strokeWidth="3"
          />
          <path d="M65 45q-6-22 15-23 21 1 15 23" fill={`url(#${id}-jade)`} />
          <path
            d="M58 51q22-14 44 0l8 33q0 36-30 48-30-12-30-48Z"
            fill={`url(#${id}-jade)`}
          />
          <path
            d="M58 51q22 17 44 0m-22 9v69M54 80q12-12 26-15 14 3 26 15M55 92q11 17 21 23m29-23q-11 17-21 23"
            stroke="#a5c2a0"
          />
          <path
            d="m61 60-5 21q-1 28 18 39m25-60 5 21q1 28-18 39"
            stroke="#2e6654"
            strokeWidth="3"
          />
          <path
            d="m65 39-9-12m39 12 9-12M68 34h5m14 0h5m-22 9q10 4 20 0"
            stroke="#c5b57a"
          />
          <path d="M64 66q7-5 11-5" stroke="#d1d6ab" strokeWidth="2" />
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
          <path
            d="m56 30 48 4 24 38-23 42-28 22-45-57Z"
            fill={`url(#${id}-jade)`}
          />
          <path
            d="m56 30 14 37-38 12m38-12 34-33-7 37 31 1-31-1-20 65Zm0 0 27 4M56 30 77 136m-7-69 7 69m20-65 8 43"
            stroke="#a9c7a5"
          />
          <path d="m56 30 14 37 27 4 7-37Z" fill="#9bb89b" opacity=".55" />
          <path
            d="m32 79 38-12 7 69Zm65-8 31 1-23 42-28 22Z"
            fill="#154c43"
            opacity=".6"
          />
          <path
            d="m56 30-24 49 12-7 20-30Zm14 37 27 4-20 65Z"
            fill="#b6d0b0"
            opacity=".25"
          />
          <path d="m91 45-11 16m26 31-5 10" stroke="#e0ddbb" />
        </g>
      ) : null}
      {kind === "moon" ? (
        <g>
          <path
            d="M51 55q29-32 58 0l9 45q-7 33-38 33-32 0-38-33Z"
            fill="#a38e58"
          />
          <ellipse
            cx="80"
            cy="79"
            rx="35"
            ry="47"
            fill="#b6c8c6"
            stroke="#758b88"
          />
          <path
            d="M54 49q25-24 48-1 18 17 5 46-20 35-48 13-14-15-5-58Z"
            fill="#cad6cf"
            stroke="none"
          />
          <path
            d="M87 48q-26 6-24 33 3 28 29 28-14-11-15-28-1-19 10-33Z"
            fill="#ede7c9"
            stroke="#a3b2a3"
          />
          <path
            d="M58 47q10-10 21-10m-24 16-3 7m-1 51q28 26 56-1"
            stroke="#edf0dc"
            strokeWidth="2"
          />
          <path
            d="M45 94l7 7m56-7-7 7M61 130h38m-35 5h31"
            stroke="#c7ae77"
            strokeWidth="3"
          />
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
        </g>
      ) : null}
      {newDrawings[kind] ? <g>{newDrawings[kind]}</g> : null}
      <path d="M17 145h16m94 0h16" stroke="#b7a77c" strokeWidth=".7" />
    </svg>
  );
}
