import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { TOTAL_CHECKPOINTS } from "@/lib/route-data";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const sort = request.nextUrl.searchParams.get("sort") ?? "points";
  if (!["points", "time"].includes(sort))
    return NextResponse.json(
      { error: "Choose points or time." },
      { status: 400 },
    );
  const level = Number(request.nextUrl.searchParams.get("level") ?? 0);
  if (!Number.isInteger(level) || level < 0 || level > TOTAL_CHECKPOINTS)
    return NextResponse.json(
      { error: "Choose a checkpoint from 1 to 60." },
      { status: 400 },
    );
  try {
    const sql = db();
    const rows =
      level === 0
        ? await sql`SELECT u.username,sum(p.score)::integer AS score,sum(p.attempts)::integer AS attempts,count(*)::integer AS completed,CASE WHEN count(p.duration_ms)=count(*) THEN sum(p.duration_ms)::double precision ELSE NULL END AS duration_ms FROM expedition.route_progress p JOIN expedition.users u ON u.id=p.user_id WHERE p.completed_at IS NOT NULL GROUP BY u.id,u.username HAVING (${sort}='points' OR (count(*)=60 AND count(p.duration_ms)=60)) ORDER BY CASE WHEN ${sort}='time' THEN sum(p.duration_ms) END ASC, sum(p.score) DESC,max(p.completed_at) ASC,u.username ASC LIMIT 10`
        : await sql`SELECT u.username,p.score,p.attempts,p.completed_at,p.duration_ms::double precision AS duration_ms,(SELECT count(*)::integer FROM expedition.route_progress all_p WHERE all_p.user_id=u.id AND all_p.completed_at IS NOT NULL) AS completed FROM expedition.route_progress p JOIN expedition.users u ON u.id=p.user_id WHERE p.checkpoint=${level} AND p.completed_at IS NOT NULL AND (${sort}='points' OR p.duration_ms IS NOT NULL) ORDER BY CASE WHEN ${sort}='time' THEN p.duration_ms END ASC,p.score DESC,p.completed_at ASC,u.username ASC LIMIT 10`;
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
