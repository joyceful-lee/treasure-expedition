import { useId } from "react";
import { checkpoints } from "@/lib/route-data";
const coastPoints = [
  [112, 432],
  [85, 402],
  [72, 370],
  [76, 348],
  [101, 323],
  [90, 301],
  [123, 276],
  [133, 238],
  [160, 226],
  [171, 190],
  [205, 174],
  [221, 137],
  [259, 126],
  [276, 103],
  [322, 111],
  [349, 87],
  [392, 98],
  [425, 74],
  [472, 82],
  [500, 60],
  [540, 72],
  [572, 49],
  [613, 62],
  [646, 40],
  [691, 53],
  [720, 31],
  [758, 46],
  [787, 29],
  [821, 42],
  [848, 28],
  [877, 47],
  [914, 54],
  [927, 83],
  [955, 105],
  [944, 135],
  [967, 161],
  [951, 194],
  [970, 222],
  [951, 252],
  [960, 283],
  [941, 306],
  [952, 343],
  [927, 363],
  [933, 391],
  [901, 407],
  [886, 435],
  [846, 450],
  [817, 440],
  [786, 462],
  [758, 456],
  [731, 487],
  [698, 497],
  [679, 529],
  [655, 545],
  [626, 529],
  [600, 550],
  [567, 536],
  [541, 552],
  [504, 540],
  [473, 553],
  [444, 535],
  [410, 548],
  [381, 532],
  [348, 546],
  [316, 524],
  [287, 530],
  [263, 509],
  [235, 514],
  [213, 493],
  [181, 496],
  [163, 472],
  [139, 467],
];
export const shore =
  coastPoints
    .map((p, i, all) => {
      const a = all[(i + all.length - 1) % all.length],
        b = all[(i + 1) % all.length],
        c = all[(i + 2) % all.length];
      return `${i === 0 ? "M" + p.join(" ") : ""} C${p[0] + (b[0] - a[0]) / 6} ${p[1] + (b[1] - a[1]) / 6},${b[0] - (c[0] - p[0]) / 6} ${b[1] - (c[1] - p[1]) / 6},${b.join(" ")}`;
    })
    .join(" ") + " Z";
const clear = (x: number, y: number, r: number) =>
  checkpoints.every(
    (p) => Math.hypot(p.x * 10 - x, p.y * 6 - y) > r + (p.major ? 25 : 18),
  );
function Fir({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-13 13q13 5 26 0" stroke="#8c9172" opacity=".5" />
      <path d="M0 13v-39" stroke="#4b604b" strokeWidth="2" />
      <path
        d="m0-32-9 15 4-1-10 16 8-2-11 15q18-4 36 0L7-4l8 2L5-18l4 1Z"
        fill="#819072"
        stroke="#53664e"
        strokeWidth=".8"
      />
      <path
        d="M0-26v33m0-18-7 8m7 0 10 9"
        fill="none"
        stroke="#c5c39b"
        strokeWidth=".7"
      />
    </g>
  );
}
function Peak({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-33 18-20 1 0-41 23-4 36 18q-30 6-69 0Z"
        fill="#c6bea2"
        stroke="#887e60"
        strokeWidth="1.1"
      />
      <path d="m0-41 5 31 23 26-15-2-9-20-9-9Z" fill="#9c9f83" />
      <path d="m-9-23 9-18 11 20-8-4-4 8-4-10Z" fill="#efe4c6" />
      <path
        d="m-3-9-16 24m23-22 8 19m-35-3-4 10m12-15-5 14m26-7 5 8"
        stroke="#817a60"
        fill="none"
        strokeWidth=".8"
      />
    </g>
  );
}
export default function MapArt() {
  const id = "map" + useId().replace(/:/g, "");
  const forest = Array.from({ length: 72 }, (_, i) => ({
    x: 210 + (i % 9) * 24 + (Math.floor(i / 9) % 2) * 11,
    y: 198 + Math.floor(i / 9) * 20,
    s: 0.5 + (i % 4) * 0.09,
  })).filter((p) => clear(p.x, p.y, 30));
  const mountains = [
    { x: 600, y: 174, s: 0.45 },
    { x: 620, y: 180, s: 0.35 },
  ];
  return (
    <svg
      className="island-art"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id + "land"}>
          <path d={shore} />
        </clipPath>
        <mask id={id + "mouth"}>
          <rect width="1000" height="600" fill="white" />
          <ellipse cx="655" cy="545" rx="15" ry="22" fill="black" />
        </mask>
        <pattern
          id={id + "water"}
          width="74"
          height="53"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M9 31q7-4 14 0t14 0m16-17q5-3 10 0"
            stroke="#768e80"
            opacity=".25"
            fill="none"
            strokeWidth=".7"
          />
        </pattern>
        <pattern
          id={id + "paper"}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="2" r=".45" fill="#897a52" opacity=".15" />
        </pattern>
      </defs>
      <rect width="1000" height="600" fill="#d8decb" />
      <rect width="1000" height="600" fill={`url(#${id}water)`} />
      <g fill="none" stroke="#8c987c" opacity=".45">
        <path
          d="M24 292h952M492 24v552M42 42l916 516M42 558 958 42"
          strokeWidth=".45"
        />
        <rect x="18" y="18" width="964" height="564" strokeWidth=".8" />
        <rect x="23" y="23" width="954" height="554" strokeWidth=".4" />
        {Array.from({ length: 19 }, (_, i) => (
          <path
            key={i}
            d={`M${50 + i * 50} 18v${i % 2 ? 5 : 9}m0 555v9`}
            strokeWidth=".6"
          />
        ))}
      </g>
      <path
        d={shore}
        fill="none"
        stroke="#9faf97"
        strokeWidth="19"
        opacity=".3"
        mask={`url(#${id}mouth)`}
      />
      <path
        d={shore}
        fill="none"
        stroke="#edf0d7"
        strokeWidth="9"
        mask={`url(#${id}mouth)`}
      />
      <path
        d={shore}
        fill="#e9d9ad"
        stroke="#9f946d"
        strokeWidth="1.6"
        mask={`url(#${id}mouth)`}
      />
      <path d={shore} fill="#e9d9ad" clipPath={`url(#${id}land)`} />
      <g clipPath={`url(#${id}land)`}>
        <rect width="1000" height="600" fill={`url(#${id}paper)`} />
        <path
          d="M194 270q40-103 131-103 130 17 134 104-21 104-147 98-114-21-118-99Z"
          fill="#a9b98e"
          opacity=".29"
        />
        <path
          d="M520 155q92-92 182-42 43 46 17 118-84 68-161 11Z"
          fill="#b5b395"
          opacity=".3"
        />
        <g fill="none" stroke="#ac9b72" strokeWidth=".65" opacity=".55">
          <path d="M147 445q-61-61-20-121t54-110 89-61 115-21M164 441q-46-60-11-106t50-110 84-51M296 482q73 42 130 26t106 10M315 471q62 30 112 18m331-72q69 20 116-34t38-108M777 403q57 12 88-27m-99-297q51-17 94 8t53 62M490 136q32-45 79-30m-46 42q31-25 48-25" />
        </g>
        <path
          d="M643 112C674 138 680 156 679 183C678 209 692 224 699 250C709 273 694 294 688 316C677 342 684 361 688 384C694 414 678 445 667 467C651 495 650 526 643 562L675 565C659 529 668 492 681 472C700 442 709 412 702 382C696 358 692 344 704 319C725 288 726 271 715 246C706 221 696 208 695 182C694 150 677 126 650 108Z"
          fill="#9bb7a9"
          stroke="#8ba491"
          strokeWidth="1"
        />
        <path
          d="M646 116C675 143 682 158 683 183C682 209 695 228 703 251C714 280 695 299 693 318C682 346 688 364 692 384C698 416 681 447 672 468C656 502 657 525 652 547"
          fill="none"
          stroke="#dce6d0"
          strokeWidth="2.2"
          opacity=".85"
        />
        <path
          d="m690 177 3 8m9 63 4 9m-15 73-3 10m5 58-1 10m-17 58-5 10"
          stroke="#789e91"
          fill="none"
          strokeWidth="1.2"
        />
        <ellipse cx="646" cy="111" rx="14" ry="9" fill="#9bb7a9" />
        <path
          d="M636 109q10-5 18 1m-15 5q7 3 12 0"
          fill="none"
          stroke="#dce6d0"
          strokeWidth="1"
        />
        {forest
          .sort((a, b) => a.y - b.y)
          .map((p, i) => (
            <Fir key={i} {...p} />
          ))}
        {mountains
          .sort((a, b) => a.y - b.y)
          .map((p, i) => (
            <Peak key={i} {...p} />
          ))}
        <g stroke="#8d7d57" fill="#dbcb9e" strokeWidth="1.2">
          <g transform="translate(340 244) scale(.8)">
            <path
              d="M-25 13h50v5h-50Zm5 0V-9h12v22m16 0V-9h12v22M-24-9h48v-5h-48Z"
              fill="#c4bd94"
            />
            <path d="M-8 13V3Q0-13 8 3v10" fill="#84947c" />
            <path d="M-24-14l9-7 8 7m14 0 8-7 9 7M-22 18h44" fill="#d9cda7" />
            <path
              d="M-18-6h6m0 6h-6m6 6h-6M12-6h6m-6 6h6m-6 6h6M-6-7h12"
              stroke="#9d9878"
            />
            <path
              d="M-24 8q8-7 4-16m43 23q-9-7-5-17"
              stroke="#6f8860"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="m-22 0-6-2 2-5m47 11 5-3 1 6"
              stroke="#6f8860"
              fill="none"
            />
          </g>
          <g transform="translate(507 342)">
            <path d="M-28 18h60v5h-60Zm-5 5h70v5h-70" fill="#b9b28e" />
            <path
              d="M-24 18V-9h8v27m7 0V-5h7v23m9 0V-9h8v27m8 0V1h8v17"
              fill="#d5c8a0"
            />
            <path d="M-29-9 0-28 31-9H9l-9-6-9 6Z" fill="#d9ccaa" />
            <path
              d="m-21-14 21-14 9 6m6 4 12 8M-24-5h8m7 5h7m9-5h8m8 10h8M-24 14h8m-9-1h3m26 10h21"
              stroke="#a09573"
              fill="none"
            />
            <path
              d="m25-12 8 1-3 7-8-1Zm-55 24 7-1 3 7h-12Zm42 16 9-2 6 5h-15"
              fill="#c5bd9a"
            />
            <path
              d="M-31 24q8-8 13-2m32-3q6-8 10-5"
              stroke="#819278"
              fill="none"
            />
          </g>
          <g transform="translate(843 91) scale(.75)">
            <path
              d="M-23 13h46v5h-46Zm4 0V-5h38v18M-25-5 0-22 25-5Z"
              fill="#c8b582"
            />
            <path
              d="M-19-5h38v4h-38M-14 1v11m28-11v11M-6 13V3a6 6 0 0 1 12 0v10"
              stroke="#796d4e"
            />
            <path d="M-18-10 0-21l18 11M-28 18h56v4h-56" fill="#e4d5ad" />
            <path d="M-31 16V-9h8v25m46 0V-9h8v25M-33-9l6-9 6 9m0 0h-12m54 0 6-9 6 9m-12 0h12" />
            <path d="M-8-8h16m-12-3h8M-19 19h38" stroke="#ab9464" />
            <path d="m0 4 3 4-3 4-3-4Z" fill="#81927a" />
          </g>
        </g>
        <g
          transform="translate(780 275)"
          stroke="#8b7b58"
          fill="#ded0a9"
          strokeWidth="1.2"
        >
          <path d="M-18 16h47v5h-47Zm4 0V-7h34v23" fill="#c8bd98" />
          <path d="M-18-7a21 21 0 0 1 42 0Z" fill="#8d9b83" />
          <path d="M3-28Q-5-19-4-7m7-21q8 9 7 21M-19-5h44v4h-44" fill="none" />
          <path d="M-5 16V8a6 6 0 0 1 12 0v8M14 4h4v6h-4" fill="#697c6e" />
          <path d="m10-20 16-13 4 5-17 12Z" fill="#ad9564" />
          <path d="m25-34 6 8m-20 9 3 5M-24 21h57v4h-57" />
          <path d="M-10 0v14m21-14v14m-25 3h34" stroke="#e7d9b6" />
        </g>
      </g>
      <path
        d={shore}
        fill="none"
        stroke="#a7976b"
        strokeWidth="1.1"
        mask={`url(#${id}mouth)`}
      />
      <g fill="#e1d1a6" stroke="#a19770" strokeWidth="1">
        <path d="M52 396q-17 11-12 26 16 9 28-3l-4-15ZM924 472l12-8 14 9-8 14-18-3Z" />
        <path d="m68 462-8 7 5 6 10-5Z" />
      </g>
      <polyline
        points={checkpoints.map((c) => `${c.x * 10},${c.y * 6}`).join(" ")}
        fill="none"
        stroke="#f2e4bd"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={checkpoints.map((c) => `${c.x * 10},${c.y * 6}`).join(" ")}
        fill="none"
        stroke="#8d6146"
        strokeWidth="1.8"
        strokeDasharray="2 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g
        transform="translate(699 250) rotate(26)"
        stroke="#74664b"
        strokeWidth="1"
      >
        <path
          d="M-23 10q22 9 46 0v5h-46Z"
          fill="#677968"
          opacity=".35"
          stroke="none"
        />
        <path d="M-24-8h48v16h-48Z" fill="#c6b38b" />
        {[-18, -12, -6, 0, 6, 12, 18].map((x) => (
          <path key={x} d={`M${x}-7V7`} stroke="#9b8863" strokeWidth=".8" />
        ))}
        <path
          d="M-26-12h52M-26 12h52m-48-26v7m10-7v7m12-7v7m12-7v7m10-7v7m-44 14v7m10-7v7m12-7v7m12-7v7m10-7v7"
          fill="none"
          strokeWidth="1.4"
        />
        <path d="M-26-7v14m52-14v14" stroke="#e6d1a0" />
      </g>
      <g
        transform="translate(90 461) rotate(-15)"
        stroke="#806849"
        strokeWidth="1.1"
      >
        <path d="M-24 3q23 12 48-2l-10 15H-10Z" fill="#a08055" />
        <path d="M-20 5q19 6 36 1m-31 5h24" stroke="#d9bd85" fill="none" />
        <path d="M-1 3v-43" strokeWidth="2" />
        <path d="M-4-37q-5 16-20 33l20-3Z" fill="#eee1bc" />
        <path d="M3-34q21 11 17 31L3-7Z" fill="#e5d3a8" />
        <path
          d="M-3-37 20-3m-20-1 15 17m-16-14-14 13"
          fill="none"
          stroke="#a38b5b"
          strokeWidth=".65"
        />
        <path d="M-1-40 10-37-1-34" fill="#8a5945" />
        <path
          d="M-31 19q14-4 26 0t28-1m-48 6q12-3 25 0m15-1h11"
          fill="none"
          stroke="#8ca799"
          strokeWidth=".8"
        />
      </g>
      <g transform="translate(81 104)" stroke="#596c56" fill="none">
        <circle r="31" strokeWidth=".7" />
        <circle r="25" strokeDasharray="1 4" opacity=".65" />
        {[0, 45, 90, 135].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path
              d="M0-40 5 0 0 40-5 0Z"
              fill={a % 90 ? "#bdc3a0" : "#6d8061"}
              strokeWidth=".65"
            />
            <path d="M0-40v40h-5Z" fill="#f1e6c4" strokeWidth=".5" />
          </g>
        ))}
        <circle r="3" fill="#b9995f" />
        <text
          y="-48"
          textAnchor="middle"
          fill="#596c56"
          stroke="none"
          fontSize="12"
        >
          N
        </text>
      </g>
      <g
        fill="#687657"
        fontFamily="'IM Fell English',Georgia,serif"
        fontStyle="italic"
        letterSpacing="2"
      >
        <text x="226" y="159" fontSize="12">
          Whispering Woods
        </text>
        <text x="510" y="92" fontSize="12">
          Serpent Ridge
        </text>
        <text x="463" y="445" fontSize="11" letterSpacing="1">
          Sunken Ruins
        </text>
        <text x="752" y="365" fontSize="11">
          Moon Observatory
        </text>
        <text x="771" y="210" fontSize="10">
          The Lost Treasury
        </text>
        <text x="47" y="553" fontSize="14" fill="#789584">
          The Uncharted Sea
        </text>
        <text x="827" y="535" fontSize="12" fill="#789584">
          Silver Tide
        </text>
      </g>
      <g
        transform="translate(875 561)"
        stroke="#758a76"
        fill="none"
        strokeWidth="1"
      >
        <path d="M-44 0h88M-44-3v6M0-3v6m44-6v6" />
        <text
          y="14"
          textAnchor="middle"
          stroke="none"
          fill="#758a76"
          fontFamily="'Special Elite',monospace"
          fontSize="8"
        >
          ONE DAY ON FOOT
        </text>
      </g>
    </svg>
  );
}
