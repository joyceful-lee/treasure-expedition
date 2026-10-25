import { Star } from "lucide-react";
import { starsFor } from "@/lib/ratings";
export default function CheckpointStars({
  attempts,
  completed,
}: {
  attempts: number;
  completed: boolean;
}) {
  const stars = starsFor(attempts, completed);
  return (
    <span
      className="checkpoint-stars"
      role="img"
      aria-label={`${stars} out of 3 stars`}
      title="First attempt: 3 stars. Second: 2 stars. Third or later: 1 star."
    >
      {[1, 2, 3].map((n) => (
        <Star
          key={n}
          size={18}
          fill={n <= stars ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
