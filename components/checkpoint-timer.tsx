"use client";
import { useEffect, useState } from "react";
import type { Progress } from "@/lib/expedition";
import { formatTime } from "@/lib/time";
export default function CheckpointTimer({
  record,
}: {
  record: Progress | undefined;
}) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!record?.started_at || record.completed_at) return;
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, [record?.started_at, record?.completed_at]);
  const elapsed = record?.completed_at
    ? record.duration_ms
    : record?.started_at
      ? Math.max(0, now - new Date(record.started_at).getTime())
      : null;
  return (
    <p className="puzzle-timer" role="timer" aria-label="Checkpoint time">
      Time: {formatTime(elapsed)}
    </p>
  );
}
