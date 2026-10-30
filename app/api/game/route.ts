import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isCorrect } from "@/lib/puzzles";
import { explanationFor } from "@/lib/puzzles-route";
import { usernameError } from "@/lib/usernames";
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
      sql`SELECT checkpoint,attempts,completed_at,score,treasure_id,started_at,duration_ms::double precision AS duration_ms FROM expedition.route_progress WHERE user_id=${uid}`,
      sql`SELECT treasure_id,quantity FROM expedition.all_inventory WHERE user_id=${uid} AND quantity>0`,
    ]);
    return NextResponse.json({
      profile: profiles[0] ?? null,
      progress,
      inventory,
      lessons: Object.fromEntries(
        progress
          .filter((record) => record.completed_at)
          .map((record) => [
            record.checkpoint,
            explanationFor(Number(record.checkpoint)),
          ]),
      ),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not load your expedition. Please try again." },
      { status: 503 },
    );
  }
}
export async function POST(request: NextRequest) {
  const requestStartedAt = new Date().toISOString();
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
    if (body.action === "profile" || body.action === "username") {
      const problem = usernameError(body.username);
      if (problem)
        return NextResponse.json({ error: problem }, { status: 400 });
      if (body.action === "username") {
        const rows =
          await sql`UPDATE expedition.users SET username=${body.username} WHERE id=${uid} RETURNING id`;
        if (!rows.length)
          return NextResponse.json(
            { error: "Create your explorer profile first." },
            { status: 400 },
          );
      } else
        await sql`INSERT INTO expedition.users(id,username) VALUES(${uid},${body.username}) ON CONFLICT(id) DO NOTHING`;
      return NextResponse.json({ ok: true });
    }
    if (body.action === "start") {
      if (
        !Number.isInteger(body.checkpoint) ||
        body.checkpoint < 1 ||
        body.checkpoint > 60
      )
        return NextResponse.json(
          { error: "Choose a valid checkpoint." },
          { status: 400 },
        );
      const results = await sql.transaction([
        sql`SELECT expedition.begin_checkpoint(${uid}::uuid,${body.checkpoint}::integer)`,
        ...(body.restartTimer === true
          ? [
              sql`UPDATE expedition.route_progress SET started_at=${requestStartedAt}::timestamptz,duration_ms=NULL WHERE user_id=${uid}::uuid AND checkpoint=${body.checkpoint}::integer AND completed_at IS NULL`,
            ]
          : []),
        sql`SELECT checkpoint,attempts,completed_at,score,treasure_id,started_at,duration_ms::double precision AS duration_ms FROM expedition.route_progress WHERE user_id=${uid}::uuid AND checkpoint=${body.checkpoint}::integer`,
      ]);
      return NextResponse.json({ ok: true, progress: results.at(-1)?.[0] });
    }
    if (body.action === "sell") {
      if (
        typeof body.item !== "string" ||
        !Number.isInteger(body.quantity) ||
        body.quantity < 1 ||
        body.quantity > 10000
      )
        return NextResponse.json(
          { error: "Choose a treasure to sell." },
          { status: 400 },
        );
      const rows =
        await sql`SELECT expedition.sell_artifacts(${uid}::uuid,${body.item},${body.quantity}::integer) AS coins`;
      return NextResponse.json(rows[0]);
    }
    if (body.action === "acknowledge") {
      if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id))
        return NextResponse.json(
          { error: "Choose a valid notification." },
          { status: 400 },
        );
      await sql`UPDATE expedition.trade_notifications SET read_at=clock_timestamp() WHERE id=${body.id}::uuid AND user_id=${uid}::uuid AND read_at IS NULL`;
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
    if (body.action === "reset") {
      if (body.confirmation !== "RESET EXPEDITION")
        return NextResponse.json(
          { error: "Confirm the expedition reset first." },
          { status: 400 },
        );
      await sql`SELECT expedition.reset_expedition(${uid}::uuid)`;
      return NextResponse.json({ ok: true });
    }
    if (body.action === "pack") {
      const rows =
        await sql`SELECT expedition.open_artifact_pack_receipt(${uid}::uuid) AS result`;
      return NextResponse.json(rows[0].result);
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
      const rows =
        await sql`SELECT expedition.exchange_artifact_trade(${uid}::uuid,${body.id}::uuid,${body.action === "cancel"}::boolean) AS result`;
      return NextResponse.json(rows[0].result);
    }
    return NextResponse.json(
      { error: "Unknown expedition action." },
      { status: 400 },
    );
  } catch (error) {
    const e = error as { code?: string; message?: string };
    const message =
      e.code === "23505"
        ? "That username is taken. Try another."
        : e.code === "P0001"
          ? e.message
          : "Could not save that action. Please try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
