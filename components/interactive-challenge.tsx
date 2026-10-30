"use client";
import { useEffect, useState } from "react";
import type { Checkpoint } from "@/lib/route-data";
import { activities, decimalAnswerPattern } from "@/lib/challenges";

function FieldModel({
  checkpoint,
  values,
}: {
  checkpoint: number;
  values: Record<string, string>;
}) {
  if (checkpoint === 10)
    return (
      <div className="study-model supply-model">
        <svg
          viewBox="0 0 360 140"
          role="img"
          aria-label="A drinking-water tank with a gauge showing your selected number of liters"
        >
          <defs>
            <clipPath id="water-tank">
              <rect x="48" y="18" width="100" height="105" rx="14" />
            </clipPath>
          </defs>
          <rect
            x="48"
            y="18"
            width="100"
            height="105"
            rx="14"
            fill="#e5dcc0"
            stroke="#596750"
            strokeWidth="2"
          />
          <rect
            x="48"
            y={123 - ((Number(values.water) || 0) / 120) * 105}
            width="100"
            height={((Number(values.water) || 0) / 120) * 105}
            fill="#739c98"
            clipPath="url(#water-tank)"
          />
          <path
            d="M65 13v-7h65v7M148 100h17v12"
            fill="none"
            stroke="#596750"
            strokeWidth="3"
          />
          <text x="195" y="40">
            12 explorers
          </text>
          <text x="195" y="69">
            3 days
          </text>
          <text x="195" y="98">
            2.5 liters each per day
          </text>
        </svg>
        <p>
          The gauge shows your drinking-water allocation; the fruit drink is a
          separate batch.
        </p>
      </div>
    );
  if (checkpoint === 20)
    return (
      <div className="study-model">
        <table className="study-records">
          <caption>Mean observations from repeated matching dates</caption>
          <thead>
            <tr>
              <th>Measurement</th>
              <th>Upstream</th>
              <th>Downstream</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Nutrients (mg/L)</th>
              <td>1</td>
              <td>6</td>
            </tr>
            <tr>
              <th>Algae cover (%)</th>
              <td>10</td>
              <td>70</td>
            </tr>
            <tr>
              <th>Oxygen (mg/L)</th>
              <td>8</td>
              <td>3</td>
            </tr>
            <tr>
              <th>Aquatic insect count</th>
              <td>18</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
        <p>
          The farm lies between the two sampling sites. These observations
          support an explanation; they do not rule out every other cause.
        </p>
      </div>
    );
  if (checkpoint === 30)
    return (
      <div className="study-model evidence-records">
        <article>
          <h3>Dock log · Day 3</h3>
          <p>
            “A storm damaged the lower quay. We tied up the boats while water
            rose over the harbor steps.”
          </p>
        </article>
        <article>
          <h3>Warehouse ledger · Day 4</h3>
          <p>
            “We moved the grain to the upper floor because water was entering
            the storeroom.”
          </p>
        </article>
        <article>
          <h3>Oral history · Recorded 80 years later</h3>
          <p>“My grandfather said the grain was moved when pirates came.”</p>
        </article>
      </div>
    );
  if (checkpoint === 40)
    return (
      <div className="study-model">
        <svg
          viewBox="0 0 360 200"
          role="img"
          aria-label="A right triangle with an 8-meter horizontal leg and a 6-meter vertical leg; the bridge follows its diagonal"
        >
          <path
            d="M55 28V158H290Z"
            fill="#dce4d1"
            stroke="#596750"
            strokeWidth="2"
          />
          <path d="M55 140h18v18" fill="none" stroke="#596750" />
          <path d="M55 28 290 158" stroke="#a57e43" strokeWidth="10" />
          <path
            d="M55 28 290 158"
            stroke="#e8d6a7"
            strokeWidth="5"
            strokeDasharray="2 5"
          />
          <text x="22" y="98">
            6 m
          </text>
          <text x="148" y="185">
            8 m
          </text>
          <text x="170" y="68">
            Your span: {values.span || "—"} m
          </text>
        </svg>
        <p>
          The bridge deck is 2 m wide. Each plank covers 0.5 m². The separate
          triangular support has base 4 m and perpendicular height 3 m.
        </p>
      </div>
    );
  if (checkpoint === 50) {
    const moon =
      values.moon === "opposite the Sun"
        ? [292, 94]
        : values.moon === "toward the Sun"
          ? [114, 94]
          : [204, 24];
    return (
      <div className="study-model">
        <svg
          viewBox="0 0 360 200"
          role="img"
          aria-label="Overhead Moon orbit, with the Sun to the left and sunlight traveling right. The Moon marker follows your chosen position."
        >
          <circle cx="35" cy="94" r="23" fill="#cfac58" />
          <path
            d="M68 66h48m-48 28h48m-48 28h48m-8-64 8 8-8 8m0 12 8 8-8 8m0 12 8 8-8 8"
            fill="none"
            stroke="#b58d42"
            strokeWidth="2"
          />
          <ellipse
            cx="204"
            cy="94"
            rx="88"
            ry="70"
            fill="none"
            stroke="#a7aa92"
            strokeDasharray="4 5"
          />
          <circle cx="204" cy="94" r="22" fill="#739c98" />
          <path d="m196 62 16 64" stroke="#405643" strokeWidth="2" />
          <circle
            cx={moon[0]}
            cy={moon[1]}
            r="10"
            fill="#6f735c"
            stroke="#6f735c"
          />
          <path
            d={`M${moon[0]} ${moon[1] - 10}a10 10 0 0 0 0 20Z`}
            fill="#e9e2ca"
          />
          <text x="18" y="142">
            Sun
          </text>
          <text x="181" y="145">
            Earth
          </text>
          <text x="78" y="183">
            Overhead model; sizes and distances are not to scale.
          </text>
        </svg>
        <p>
          Earth’s northern axis leans toward the Sun. Orbit tilt is omitted from
          this overhead diagram; use the stated conditions in your report. The
          Moon is shown from above; its phase describes how it looks from Earth.
        </p>
      </div>
    );
  }
  return (
    <div className="study-model pack-records">
      <p>Ten equally likely outcomes per fictional pack</p>
      {[
        { name: "Common", count: 5, coins: 2 },
        { name: "Uncommon", count: 3, coins: 6 },
        { name: "Rare", count: 2, coins: 12 },
      ].map((row) => (
        <div className="probability-row" key={row.name}>
          <span>{row.name}</span>
          <div
            className="probability-bar"
            role="img"
            aria-label={`${row.count} of 10 outcomes`}
          >
            <span style={{ width: `${row.count * 10}%` }} />
          </div>
          <span>
            {row.count}/10 · {row.coins} coins
          </span>
        </div>
      ))}
      <p>
        Each pack costs 6 coins. Expected value describes a long-run average,
        not a guaranteed return from one pack. These odds belong to this
        activity.
      </p>
    </div>
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
  const [values, setValues] = useState<Record<string, string>>({});
  const activity = activities[checkpoint.id];
  const serialized = JSON.stringify(values);
  useEffect(() => onAnswer(serialized), [serialized, onAnswer]);
  function update(id: string, value: string) {
    setValues((previous) => ({ ...previous, [id]: value }));
  }
  if (!activity) return null;
  return (
    <div className="interactive-challenge field-study">
      <FieldModel checkpoint={checkpoint.id} values={values} />
      <fieldset className="study-controls" disabled={disabled}>
        <legend>{activity.title}</legend>
        {activity.fields.map((field, index) => {
          const id = `study-${checkpoint.id}-${field.id}`;
          return (
            <div className="study-field" key={field.id}>
              <label htmlFor={id}>
                <span className="study-step">{index + 1}</span>
                {field.label}
              </label>
              <p id={`${id}-help`}>{field.help}</p>
              {field.options ? (
                <select
                  id={id}
                  value={values[field.id] ?? ""}
                  onChange={(event) => update(field.id, event.target.value)}
                  aria-describedby={`${id}-help`}
                  required
                >
                  <option value="">Choose an answer</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="measurement-control">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={
                      values[field.id] &&
                      Number.isFinite(Number(values[field.id]))
                        ? Number(values[field.id])
                        : (field.min ?? 0)
                    }
                    onChange={(event) => update(field.id, event.target.value)}
                    aria-label={`Adjust ${field.label}`}
                    aria-describedby={`${id}-help`}
                  />
                  <input
                    id={id}
                    type="text"
                    inputMode={(field.min ?? 0) < 0 ? "text" : "decimal"}
                    pattern={decimalAnswerPattern}
                    maxLength={32}
                    value={values[field.id] ?? ""}
                    onChange={(event) => update(field.id, event.target.value)}
                    aria-describedby={`${id}-help`}
                    required
                  />
                </div>
              )}
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}
