import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isCorrect } from "@/lib/puzzles";
import { TOTAL_CHECKPOINTS } from "@/lib/route-data";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { data: session } = await auth.getSession();
    if (!session?.user)
      return NextResponse.json({ profile: null, progress: [], inventory: [] });
    const sql = db();
    const uid = session.user.id;
    const [profiles, progress, inventory] = await Promise.all([
      sql`SELECT id,username,coins FROM expedition.users WHERE id=${uid}`,
      sql`SELECT checkpoint,attempts,completed_at,score,treasure_id FROM expedition.route_progress WHERE user_id=${uid}`,
      sql`SELECT treasure_id,quantity FROM expedition.all_inventory WHERE user_id=${uid} AND quantity>0`,
    ]);
    return NextResponse.json({
      profile: profiles[0] ?? null,
      progress,
      inventory,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load your expedition. Please try again." },
      { status: 503 },
    );
  }
}
export async function POST(request: NextRequest) {
  // Reject cross-origin writes, including requests with missing Origin.
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Please use the expedition website." },
      { status: 403 },
    );
  try {
    const { data: session } = await auth.getSession();
    if (!session?.user)
      return NextResponse.json(
        { error: "Log in to save your discoveries." },
        { status: 401 },
      );
    const body = await request.json();
    const sql = db();
    const uid = session.user.id;
    if (body.action === "profile") {
      if (
        typeof body.username !== "string" ||
        !/^[a-zA-Z0-9_]{3,20}$/.test(body.username)
      )
        return NextResponse.json(
          { error: "Choose 3–20 letters, numbers, or underscores." },
          { status: 400 },
        );
      await sql`INSERT INTO expedition.users(id,username) VALUES(${uid},${body.username}) ON CONFLICT(id) DO NOTHING`;
      return NextResponse.json({ ok: true });
    }
    if (body.action === "answer") {
      if (
        !Number.isInteger(body.checkpoint) ||
        body.checkpoint < 1 ||
        body.checkpoint > TOTAL_CHECKPOINTS ||
        typeof body.answer !== "string" ||
        body.answer.length > 512
      )
        return NextResponse.json(
          { error: "Enter a valid answer." },
          { status: 400 },
        );
      const rows =
        await sql`SELECT expedition.submit_artifact_answer(${uid}::uuid,${body.checkpoint}::integer,${isCorrect(body.checkpoint, body.answer)}::boolean) AS result`;
      return NextResponse.json(rows[0].result);
    }
    if (body.action === "pack") {
      const rows =
        await sql`SELECT expedition.open_artifact_pack(${uid}::uuid) AS reward`;
      return NextResponse.json(rows[0]);
    }
    if (body.action === "trade") {
      if (
        typeof body.offered !== "string" ||
        typeof body.requested !== "string"
      )
        return NextResponse.json(
          { error: "Choose the treasures to exchange." },
          { status: 400 },
        );
      await sql`SELECT expedition.make_artifact_trade(${uid}::uuid,${body.offered},${body.requested})`;
      return NextResponse.json({ ok: true });
    }
    if (body.action === "accept" || body.action === "cancel") {
      if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id))
        return NextResponse.json(
          { error: "Choose a valid trade." },
          { status: 400 },
        );
      await sql`SELECT expedition.finish_artifact_trade(${uid}::uuid,${body.id}::uuid,${body.action === "cancel"}::boolean)`;
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Unknown expedition action." },
      { status: 400 },
    );
  } catch (error) {
    const e = error as { code?: string; message?: string };
    const message =
      e.code === "23505"
        ? "That explorer name is taken. Try another."
        : e.code === "P0001"
          ? e.message
          : "Could not save that action. Please try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
