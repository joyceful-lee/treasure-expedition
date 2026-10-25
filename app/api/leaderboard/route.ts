import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const level = Number(request.nextUrl.searchParams.get("level") ?? 1);
  if (!Number.isInteger(level) || level < 1 || level > 6)
    return NextResponse.json(
      { error: "Choose a level from 1 to 6." },
      { status: 400 },
    );
  try {
    const sql = db();
    const rows =
      await sql`SELECT u.username,p.score,p.attempts,p.completed_at FROM expedition.progress p JOIN expedition.users u ON u.id=p.user_id WHERE p.checkpoint=${level} AND p.completed_at IS NOT NULL ORDER BY p.score DESC,p.completed_at ASC,u.username ASC LIMIT 10`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(
      { error: "The leaderboard could not load. Try again." },
      { status: 503 },
    );
  }
}
