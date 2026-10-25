"use client";
import { Check, Flag, LockKeyhole, Sparkles } from "lucide-react";
import { checkpoints, stateFor, type Progress } from "@/lib/expedition";
function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 9V-15" stroke="#63745a" strokeWidth="3" />
      <path
        d="M-12 0L0-26 12 0ZM-10-12L0-35 10-12Z"
        fill="#789478"
        stroke="#617f69"
        strokeWidth="1"
      />
    </g>
  );
}
function Mountain({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M-35 22L0-37 38 22Z"
        fill="#bab7a2"
        stroke="#929d89"
        strokeWidth="1.4"
      />
      <path d="M0-37L38 22H4Z" fill="#a3aa94" />
      <path d="M-12-17L0-37 15-13 4-18-2-11Z" fill="#eee9d8" />
    </g>
  );
}
export default function IslandMap({
  progress,
  onSelect,
  selected,
}: {
  progress: Progress[];
  onSelect: (id: number) => void;
  selected: number;
}) {
  return (
    <div className="island-map">
      <svg
        className="island-art"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="water"
            width="58"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M8 25q7-5 14 0t14 0"
              fill="none"
              stroke="#a5beb9"
              strokeWidth="1"
              opacity=".5"
            />
          </pattern>
          <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#6f7654" opacity=".12" />
          </pattern>
          <filter id="island-shadow">
            <feDropShadow
              dx="0"
              dy="8"
              stdDeviation="5"
              floodColor="#788f80"
              floodOpacity=".12"
            />
          </filter>
        </defs>
        <rect width="1000" height="600" fill="#dfe9e1" />
        <rect width="1000" height="600" fill="url(#water)" />
        <path
          d="M127 425Q64 355 145 276T225 176Q244 115 350 127T492 86Q553 39 653 65T801 73Q920 95 916 175T924 298Q983 364 904 430T748 462Q676 561 575 514T408 535Q344 567 265 512T127 425Z"
          fill="none"
          stroke="#c1d4c6"
          strokeWidth="25"
        />
        <path
          d="M127 425Q64 355 145 276T225 176Q244 115 350 127T492 86Q553 39 653 65T801 73Q920 95 916 175T924 298Q983 364 904 430T748 462Q676 561 575 514T408 535Q344 567 265 512T127 425Z"
          fill="#f0e8cb"
          stroke="#c4c5a1"
          strokeWidth="2"
          filter="url(#island-shadow)"
        />
        <path
          d="M127 425Q64 355 145 276T225 176Q244 115 350 127T492 86Q553 39 653 65T801 73Q920 95 916 175T924 298Q983 364 904 430T748 462Q676 561 575 514T408 535Q344 567 265 512T127 425Z"
          fill="url(#dots)"
        />
        <path
          d="M238 301Q219 213 310 185T440 199Q489 261 421 309T300 369Z"
          fill="#ced6ad"
          opacity=".8"
        />
        <path
          d="M550 222Q545 151 643 123T747 188Q772 252 681 280Z"
          fill="#d9d8b9"
        />
        <path
          d="M805 150Q720 168 740 233T689 324Q640 342 658 406T622 502"
          fill="none"
          stroke="#abbeb0"
          strokeWidth="16"
        />
        <path
          d="M805 150Q720 168 740 233T689 324Q640 342 658 406T622 502"
          fill="none"
          stroke="#c1d4c5"
          strokeWidth="10"
        />
        <path
          d="M180 420C193 337 286 370 340 282S417 288 510 396S566 268 630 216S701 251 780 324S847 259 840 132"
          fill="none"
          stroke="#b39d73"
          strokeWidth="3"
          strokeDasharray="6 9"
          strokeLinecap="round"
        />
        <path
          d="M180 420C193 337 286 370 340 282"
          fill="none"
          stroke="#bc6b38"
          strokeWidth="3"
          strokeDasharray="6 9"
          strokeLinecap="round"
        />
        {[
          { x: 265, y: 239 },
          { x: 294, y: 224 },
          { x: 320, y: 218 },
          { x: 353, y: 230 },
          { x: 388, y: 220 },
          { x: 285, y: 266 },
          { x: 313, y: 252 },
          { x: 378, y: 261 },
          { x: 410, y: 244 },
          { x: 250, y: 277 },
          { x: 300, y: 304 },
          { x: 395, y: 306 },
          { x: 356, y: 328 },
          { x: 429, y: 279 },
          { x: 215, y: 293 },
        ].map((p, i) => (
          <Tree key={i} {...p} s={0.7 + (i % 3) * 0.15} />
        ))}
        <Mountain x={558} y={194} s={1.1} />
        <Mountain x={612} y={173} s={1.5} />
        <Mountain x={665} y={166} s={0.9} />
        <Mountain x={683} y={201} s={1.2} />
        <g stroke="#aeaa8b" strokeWidth="2" fill="#e4d9b5">
          <path d="M459 423h95v10h-95zM470 414h73v9h-73z" />
          <path d="M473 410v-37h11v37m20 0v-37h11v37m20 0v-37h10v37" />
          <path d="M464 373l45-25 45 25z" />
        </g>
        <g
          transform="translate(837 111)"
          fill="#d8bb77"
          stroke="#af965e"
          strokeWidth="2"
        >
          <path d="M-35 8h70v18h-70zM-28 8v-30h10V8M18 8v-30h10V8M-9 8v-22H9V8" />
          <path d="M-35-22l12-13 12 13M11-22l12-13 12 13M-17-14L0-34l17 20" />
        </g>
        <g transform="translate(791 350)" stroke="#9a9e87" fill="#dbd6b4">
          <path d="M-28 0h56v9h-56zM-21 0v-35h42V0M-26-35L0-55l26 20Z" />
          <circle cy="-21" r="8" fill="#b2bba1" />
        </g>
        <g
          transform="translate(148 444) rotate(-14)"
          stroke="#9b896a"
          fill="#d6bd88"
        >
          <path d="M-24 0q24 24 48 0Z" />
          <path d="M0 0v-43L-20-7H0M4-37L22-9H4" fill="#f5edd6" />
        </g>
        <g fill="#9fae86" opacity=".8">
          <ellipse cx="400" cy="462" rx="21" ry="6" />
          <ellipse cx="446" cy="478" rx="12" ry="4" />
          <ellipse cx="186" cy="225" rx="8" ry="4" />
        </g>
        <g transform="translate(90 105)" stroke="#8b9b88" fill="none">
          <circle r="32" />
          <circle r="25" strokeDasharray="2 5" />
          <path d="M0-43V43M-43 0H43" />
          <path d="M0-29L7 0 0 29-7 0Z" fill="#879b86" />
          <path d="M0-29L-7 0H0Z" fill="#f1ecd5" />
        </g>
        <text
          x="90"
          y="52"
          textAnchor="middle"
          fill="#7d8f7b"
          fontFamily="Georgia"
          fontSize="14"
        >
          N
        </text>
        <text
          x="305"
          y="178"
          fill="#8b9577"
          fontFamily="Georgia"
          fontSize="13"
          fontStyle="italic"
          letterSpacing="3"
        >
          WHISPERING WOODS
        </text>
        <text
          x="547"
          y="107"
          fill="#929578"
          fontFamily="Georgia"
          fontSize="12"
          fontStyle="italic"
          letterSpacing="2"
        >
          SERPENT RIDGE
        </text>
        <text
          x="70"
          y="541"
          fill="#8ba59d"
          fontFamily="Georgia"
          fontSize="14"
          fontStyle="italic"
          letterSpacing="3"
        >
          The Uncharted Sea
        </text>
        <text
          x="805"
          y="498"
          fill="#8ba59d"
          fontFamily="Georgia"
          fontSize="13"
          fontStyle="italic"
          letterSpacing="2"
        >
          SILVER TIDE
        </text>
        <g transform="translate(900 526)" stroke="#829b8d" strokeWidth="1.3">
          <path d="M-30 0h60M-30-4v8M0-4v8M30-4v8" />
        </g>
        <text
          x="900"
          y="549"
          textAnchor="middle"
          fill="#829b8d"
          fontSize="10"
          letterSpacing="2"
        >
          1 DAY’S JOURNEY
        </text>
      </svg>
      {checkpoints.map((cp) => {
        const state = stateFor(cp.id, progress);
        return (
          <button
            key={cp.id}
            className={`map-pin ${state} ${selected === cp.id ? "selected" : ""}`}
            style={{ left: `${cp.x}%`, top: `${cp.y}%` }}
            onClick={() => onSelect(cp.id)}
            aria-label={`${cp.name}: ${state}`}
          >
            <span className="pin-circle">
              {state === "completed" ? (
                <Check size={20} />
              ) : state === "locked" ? (
                <LockKeyhole size={17} />
              ) : (
                <Flag size={21} />
              )}
            </span>
            <span className="pin-label">
              <small>0{cp.id}</small> {cp.name}
            </span>
            {state === "available" ? (
              <span className="here-label">
                <Sparkles size={10} /> START HERE
              </span>
            ) : null}
          </button>
        );
      })}
      <div className="map-corner top-left" />
      <div className="map-corner bottom-right" />
    </div>
  );
}
