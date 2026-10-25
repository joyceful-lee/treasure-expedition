"use client";
import { useEffect, useState } from "react";
import type { Checkpoint } from "@/lib/route-data";
import {
  reliquaryObjects,
  objectValues,
  reliquaryClues,
  magicEngravings,
  bridgeTokens,
  bridgeClues,
  starNumbers,
  starBearings,
  vaultPlaques,
  shiftText,
} from "@/lib/challenges";

function TokenMark({ name }: { name: string }) {
  const drawings: Record<string, React.ReactNode> = {
    sun: (
      <>
        <circle cx="16" cy="16" r="6" />
        <path d="M16 2v5m0 18v5M2 16h5m18 0h5M6 6l4 4m12 12 4 4M6 26l4-4M22 10l4-4" />
      </>
    ),
    moon: <path d="M23 4A13 13 0 1 0 28 24 13 13 0 0 1 23 4Z" />,
    key: (
      <>
        <circle cx="11" cy="10" r="6" />
        <path d="M15 15l13 13m-8-8 4-4m0 8 4-4" />
      </>
    ),
    crown: <path d="M4 10l7 6 5-10 5 10 7-6-3 16H7ZM8 22h16" />,
    owl: (
      <>
        <path d="M7 9 5 3l9 5h4l9-5-2 6v11q-9 16-18 0Z" />
        <circle cx="11" cy="14" r="3" />
        <circle cx="21" cy="14" r="3" />
        <path d="m14 19 2 3 2-3M11 27l-1 3m11-3 1 3" />
      </>
    ),
    river: <path d="M9 2c16 8-15 12 1 21s12 6 12 7M18 2c16 8-15 12 1 21" />,
    tree: <path d="M16 3 6 15h5L3 25h26l-8-10h5ZM16 25v6" />,
    serpent: <path d="M8 4q20-5 16 7-2 5-14 7-16 4 0 12m12-24 7-3m-5 6 6 3" />,
  };
  return (
    <svg
      viewBox="0 0 32 32"
      className="token-mark"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawings[name]}
    </svg>
  );
}
function OrderTiles({
  order,
  onChange,
  disabled,
  label,
}: {
  order: string[];
  onChange: (next: string[]) => void;
  disabled: boolean;
  label: string;
}) {
  function move(index: number, delta: number) {
    const next = [...order];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    onChange(next);
  }
  return (
    <fieldset className="order-field">
      <legend>{label}</legend>
      <ol className="order-tiles">
        {order.map((token, i) => (
          <li key={token}>
            <span className="tile-position">{i + 1}</span>
            <TokenMark name={token} />
            <strong>{token}</strong>
            <div>
              <button
                type="button"
                disabled={disabled || i === 0}
                onClick={() => move(i, -1)}
                aria-label={`Move ${token} earlier`}
              >
                ←
              </button>
              <button
                type="button"
                disabled={disabled || i === order.length - 1}
                onClick={() => move(i, 1)}
                aria-label={`Move ${token} later`}
              >
                →
              </button>
            </div>
          </li>
        ))}
      </ol>
      <small>
        Use the arrows to change the order; it is read from first to last.
      </small>
    </fieldset>
  );
}
export default function InteractiveChallenge({
  checkpoint,
  onAnswer,
  disabled = false,
}: {
  checkpoint: Checkpoint;
  onAnswer: (value: string) => void;
  disabled?: boolean;
}) {
  const [objects, setObjects] = useState<string[]>(Array(6).fill(""));
  const [code, setCode] = useState("");
  const [cells, setCells] = useState<string[]>(
    Array.from({ length: 16 }, (_, i) => String(magicEngravings[i] ?? "")),
  );
  const [outer, setOuter] = useState(0);
  const [inner, setInner] = useState(0);
  const [word, setWord] = useState("");
  const [order, setOrder] = useState([...bridgeTokens]);
  const [route, setRoute] = useState<number[]>([]);
  const [rings, setRings] = useState([0, 0, 0]);
  const [levers, setLevers] = useState(["sun", "moon", "river"]);
  let payload: Record<string, unknown> = {};
  switch (checkpoint.challenge) {
    case "reliquary":
      payload = { objects, code };
      break;
    case "magic-square":
      payload = { cells: cells.map(Number) };
      break;
    case "rotors":
      payload = { outer, inner, word };
      break;
    case "bridge":
      payload = { order };
      break;
    case "star-chart":
      payload = { route, code };
      break;
    case "vault":
      payload = { rings, levers, word };
      break;
  }
  const serialized = JSON.stringify(payload);
  useEffect(() => onAnswer(serialized), [serialized, onAnswer]);
  function setCell(i: number, value: string) {
    setCells((old) => old.map((v, index) => (index === i ? value : v)));
  }
  return (
    <div className={`interactive-challenge challenge-${checkpoint.challenge}`}>
      {checkpoint.challenge === "reliquary" ? (
        <>
          <div className="engraving-table" aria-label="Engraved object values">
            {Object.entries(objectValues).map(([object, value]) => (
              <span key={object}>
                {object} <strong>{value}</strong>
              </span>
            ))}
          </div>
          <div className="reliquary-clues">
            {reliquaryClues.map((clue, i) => (
              <label key={clue}>
                <span>
                  {i + 1}. {clue}
                </span>
                <select
                  aria-label={`Object ${i + 1}`}
                  value={objects[i]}
                  disabled={disabled}
                  required
                  onChange={(e) =>
                    setObjects((old) =>
                      old.map((v, index) => (index === i ? e.target.value : v)),
                    )
                  }
                >
                  <option value="">Choose an object</option>
                  {[...reliquaryObjects].sort().map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <label>
            Three-digit seal
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              pattern="[0-9]{3}"
              maxLength={3}
              inputMode="numeric"
              disabled={disabled}
            />
          </label>
        </>
      ) : null}
      {checkpoint.challenge === "magic-square" ? (
        <>
          <div className="magic-square">
            {cells.map((value, i) => (
              <label key={i}>
                <span className="sr-only">
                  Row {Math.floor(i / 4) + 1}, column {(i % 4) + 1}
                  {magicEngravings[i] ? ", engraved" : ""}
                </span>
                <input
                  type="number"
                  min={1}
                  max={16}
                  step={1}
                  required
                  value={value}
                  readOnly={!!magicEngravings[i]}
                  disabled={disabled}
                  className={magicEngravings[i] ? "engraved" : ""}
                  onChange={(e) => setCell(i, e.target.value)}
                />
              </label>
            ))}
          </div>
          <p className="mechanism-note">
            Engraved cells have a darker background. The total for each row,
            column, and long diagonal is 34.
          </p>
        </>
      ) : null}
      {checkpoint.challenge === "rotors" ? (
        <>
          <label>
            Outer rotor shift: {outer}
            <input
              type="range"
              min={0}
              max={25}
              value={outer}
              onChange={(e) => setOuter(Number(e.target.value))}
              disabled={disabled}
              aria-label="Outer rotor shift"
            />
          </label>
          <output className="decoded-inscription" aria-live="polite">
            {shiftText("ZOPMA MPCL", outer)}
          </output>
          <label>
            Inner rotor shift: {inner}
            <input
              type="range"
              min={0}
              max={25}
              value={inner}
              onChange={(e) => setInner(Number(e.target.value))}
              disabled={disabled}
              aria-label="Inner rotor shift"
            />
          </label>
          <output className="decoded-inscription" aria-live="polite">
            {shiftText("YMJ LFYJ TUJSX FY IFBS", inner)}
          </output>
          <label>
            Final word, reversed
            <input
              value={word}
              onChange={(e) => setWord(e.target.value)}
              required
              maxLength={30}
              autoComplete="off"
              disabled={disabled}
            />
          </label>
        </>
      ) : null}
      {checkpoint.challenge === "bridge" ? (
        <>
          <ul className="inscription-list">
            {bridgeClues.map((clue) => (
              <li key={clue}>{clue}</li>
            ))}
          </ul>
          <OrderTiles
            order={order}
            onChange={setOrder}
            disabled={disabled}
            label="Stone plate order"
          />
        </>
      ) : null}
      {checkpoint.challenge === "star-chart" ? (
        <>
          <p className="bearing-strip">
            {starBearings.map((b, i) => (
              <span key={i}>
                {i + 1}. {b}
              </span>
            ))}
          </p>
          <p className="mechanism-note">
            North → right · East → down · South → left · West → up. Each number
            tells you how many cells to move.
          </p>
          <div className="star-chart">
            <svg viewBox="0 0 500 500" aria-hidden="true">
              <polyline
                points={[12, ...route]
                  .map(
                    (index) =>
                      `${(index % 5) * 100 + 50},${Math.floor(index / 5) * 100 + 50}`,
                  )
                  .join(" ")}
                fill="none"
                stroke="#9f6b38"
                strokeWidth="3"
                strokeDasharray="5 5"
              />
            </svg>
            {starNumbers.map((n, i) => {
              const visits = route.flatMap((index, step) =>
                index === i ? [step + 1] : [],
              );
              const label = `${"ABCDE"[i % 5]}${Math.floor(i / 5) + 1}`;
              return (
                <button
                  type="button"
                  key={i}
                  className={`star-cell ${visits.length ? "visited" : ""} ${i === 12 ? "start" : ""}`}
                  disabled={disabled || route.length >= 8}
                  onClick={() => setRoute((old) => [...old, i])}
                  aria-label={`${label}, star value ${n}`}
                  aria-pressed={visits.length > 0}
                >
                  <small>
                    {label}
                    {i === 12 ? " · start" : ""}
                  </small>
                  <strong>{n}</strong>
                  {visits.length ? <span>{visits.join(", ")}</span> : null}
                </button>
              );
            })}
          </div>
          <div className="mechanism-actions">
            <span>{route.length} of 8 landings marked</span>
            <button
              type="button"
              className="text-button"
              disabled={disabled || !route.length}
              onClick={() => setRoute((old) => old.slice(0, -1))}
            >
              Undo landing
            </button>
            <button
              type="button"
              className="text-button"
              disabled={disabled || !route.length}
              onClick={() => setRoute([])}
            >
              Clear route
            </button>
          </div>
          <label>
            Seal from landings 2, 4, 6, and 8
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              pattern="[0-9]+"
              inputMode="numeric"
              disabled={disabled}
            />
          </label>
        </>
      ) : null}
      {checkpoint.challenge === "vault" ? (
        <>
          <section className="vault-stage">
            <h3>The number rings</h3>
            <p>
              The three digits add to 12. The first is twice the second, and the
              third is three times the second. The first digit cannot be zero.
            </p>
            <div className="number-rings">
              {rings.map((n, i) => (
                <div key={i}>
                  <label>
                    Ring {i + 1}
                    <input
                      type="number"
                      min={0}
                      max={9}
                      step={1}
                      required
                      value={n}
                      disabled={disabled}
                      onChange={(e) =>
                        setRings((old) =>
                          old.map((v, index) =>
                            index === i ? Number(e.target.value) : v,
                          ),
                        )
                      }
                    />
                  </label>
                  <div>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        setRings((old) =>
                          old.map((v, index) =>
                            index === i ? (v + 9) % 10 : v,
                          ),
                        )
                      }
                      aria-label={`Turn ring ${i + 1} back`}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        setRings((old) =>
                          old.map((v, index) =>
                            index === i ? (v + 1) % 10 : v,
                          ),
                        )
                      }
                      aria-label={`Turn ring ${i + 1} forward`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="vault-stage">
            <h3>The three levers</h3>
            <p>
              Exactly one plaque is true, and the moon lever must be pulled
              before the river lever.
            </p>
            <ul className="inscription-list">
              {vaultPlaques.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <OrderTiles
              order={levers}
              onChange={setLevers}
              disabled={disabled}
              label="Lever order"
            />
          </section>
          <section className="vault-stage">
            <h3>The last inscription</h3>
            <p>
              Subtract the second ring’s digit from the first to find a Caesar
              shift. Move every letter in VTGCUWTG backwards by that amount.
            </p>
            <label>
              Decoded word
              <input
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
                maxLength={30}
                autoComplete="off"
                disabled={disabled}
              />
            </label>
          </section>
        </>
      ) : null}
    </div>
  );
}
