import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { TOTAL_CHECKPOINTS } from "@/lib/route-data";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const level = Number(request.nextUrl.searchParams.get("level") ?? 1);
  if (!Number.isInteger(level) || level < 1 || level > TOTAL_CHECKPOINTS)
    return NextResponse.json(
      { error: "Choose a checkpoint from 1 to 60." },
      { status: 400 },
    );
  try {
    const sql = db();
    const rows =
      await sql`SELECT u.username,p.score,p.attempts,p.completed_at FROM expedition.route_progress p JOIN expedition.users u ON u.id=p.user_id WHERE p.checkpoint=${level} AND p.completed_at IS NOT NULL ORDER BY p.score DESC,p.completed_at ASC,u.username ASC LIMIT 10`;
    return NextResponse.json(rows, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch {
    return NextResponse.json(
      { error: "The leaderboard could not load. Try again." },
      { status: 503 },
    );
  }
}
