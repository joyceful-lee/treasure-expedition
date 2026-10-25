import { ArrowRight, Flag, LockKeyhole } from "lucide-react";
import {
  baseScore,
  coinReward,
  regions,
  type Checkpoint,
} from "@/lib/route-data";
import { treasures } from "@/lib/artifacts";
import type { Progress } from "@/lib/expedition";
import TreasureArt from "./treasure-art";
export default function CheckpointDetails({
  checkpoint: cp,
  status,
  progress,
  loading,
  onStart,
  nextAvailable,
  onNextAvailable,
}: {
  checkpoint: Checkpoint;
  status: string;
  progress: Progress[];
  loading: boolean;
  onStart: () => void;
  nextAvailable: number | undefined;
  onNextAvailable: () => void;
}) {
  const record = progress.find((p) => p.checkpoint === cp.id);
  return (
    <section className="checkpoint-details">
      <div className="eyebrow">
        CHECKPOINT {String(cp.id).padStart(2, "0")} / 60 ·{" "}
        {regions[cp.region].name}
      </div>
      <h2>{cp.name}</h2>
      <p>{cp.subtitle}</p>
      <div className="checkpoint-detail-meta">
        <span className={`status-pill ${status}`}>{status}</span>
        <span>{cp.difficulty}</span>
        <span>{cp.kind}</span>
      </div>
      {cp.major ? (
        <p className="major-description">
          <Flag size={18} /> This is the region’s major challenge, with a
          mechanism to operate and several clues to combine.
        </p>
      ) : null}
      <div className="checkpoint-rewards">
        <TreasureArt
          kind={
            record?.completed_at ? (record.treasure_id ?? cp.reward) : "satchel"
          }
        />
        <div>
          <strong>{baseScore(cp.id).toLocaleString()} starting points</strong>
          <span>
            {record?.completed_at
              ? treasures.find(
                  (t) => t.id === (record.treasure_id ?? cp.reward),
                )?.name
              : "1 random artifact"}{" "}
            + {coinReward(cp.id)} coins
          </span>
          <small>
            Each incorrect attempt subtracts 25 points, down to a minimum of
            100.
          </small>
        </div>
      </div>
      {record?.attempts ? (
        <p className="mechanism-note">
          Your journal records {record.attempts}{" "}
          {record.attempts === 1 ? "attempt" : "attempts"}
          {record.completed_at
            ? ` and ${record.score.toLocaleString()} points for this checkpoint`
            : " so far"}
          .
        </p>
      ) : null}
      {status === "locked" ? (
        <p className="locked-explanation">
          <LockKeyhole size={17} /> Complete the earlier checkpoints to reach
          this stop
          {nextAvailable
            ? `; checkpoint ${nextAvailable} is the next one on your route`
            : ""}
          .
        </p>
      ) : null}
      <button
        className="button"
        disabled={loading || status === "locked"}
        onClick={onStart}
      >
        {loading
          ? "Loading your journal…"
          : status === "completed"
            ? "View discovery"
            : status === "locked"
              ? "Checkpoint locked"
              : status === "attempted"
                ? "Try the puzzle again"
                : cp.major
                  ? "Open the mechanism"
                  : "Read the puzzle"}
        <ArrowRight size={16} />
      </button>
      {status === "locked" && nextAvailable ? (
        <button
          className="text-button next-available"
          onClick={onNextAvailable}
        >
          Go to checkpoint {nextAvailable}
        </button>
      ) : null}
    </section>
  );
}
