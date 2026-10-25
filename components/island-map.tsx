"use client";
import { useRef } from "react";
import MapArt from "./map-art";
import {
  checkpoints,
  regions,
  pinStates,
  stateFor,
  type Progress,
} from "@/lib/expedition";
export default function IslandMap({
  progress,
  onSelect,
  selected,
}: {
  progress: Progress[];
  onSelect: (id: number) => void;
  selected: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const next = checkpoints.find((c) =>
    ["available", "attempted"].includes(stateFor(c.id, progress)),
  );
  function focusRegion(index: number) {
    const cp = checkpoints[index * 10 + 4];
    const node = scroller.current;
    if (node) {
      const canvas = node.firstElementChild as HTMLElement;
      node.scrollTo({
        left: (cp.x / 100) * canvas.offsetWidth - node.clientWidth / 2,
        top: (cp.y / 100) * canvas.offsetHeight - node.clientHeight / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }
  return (
    <>
      <nav className="route-regions" aria-label="Map regions">
        {regions.map((region, i) => (
          <button
            type="button"
            key={region.name}
            onClick={() => focusRegion(i)}
          >
            <strong>{region.name}</strong>
            <span>
              {i * 10 + 1}–{(i + 1) * 10} · {region.theme}
            </span>
          </button>
        ))}
      </nav>
      <div className="route-map-help">
        <span>
          Pan the chart to explore all 60 numbered stops. Larger pins mark the
          major challenges.
        </span>
        {next ? (
          <button
            type="button"
            className="text-button"
            onClick={() => onSelect(next.id)}
          >
            Continue at {String(next.id).padStart(2, "0")}
          </button>
        ) : null}
      </div>
      <div
        className="island-map route-scroll"
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label="Scrollable expedition map"
      >
        <div className="route-canvas">
          <MapArt />

          {checkpoints.map((cp) => {
            const state = stateFor(cp.id, progress);
            const color = pinStates.find((s) => s.id === state)!.color;
            return (
              <button
                type="button"
                key={cp.id}
                data-checkpoint={cp.id}
                data-state={state}
                className={`map-pin ${state} ${cp.major ? "major" : "midpoint"} ${selected === cp.id ? "selected" : ""}`}
                style={
                  {
                    left: cp.x + "%",
                    top: cp.y + "%",
                    "--pin-color": color,
                    "--pin-x": cp.x + "%",
                    "--pin-y": cp.y + "%",
                  } as React.CSSProperties
                }
                onClick={() => onSelect(cp.id)}
                aria-label={`Checkpoint ${cp.id}: ${cp.name}, ${state}${cp.major ? ", extreme challenge" : ""}`}
                title={`${cp.id}. ${cp.name} · ${state}`}
              >
                <span className="pin-circle">{cp.id}</span>
                <span className="pin-label">
                  {cp.name}
                  {cp.major ? " · Extreme" : ""}
                </span>
              </button>
            );
          })}
          <div className="map-corner top-left" />
          <div className="map-corner bottom-right" />
        </div>
      </div>
    </>
  );
}
