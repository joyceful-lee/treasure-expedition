import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const sql = db();
    return NextResponse.json(
      await sql`SELECT t.id,t.maker_id,u.username,t.offered,t.requested,t.status FROM expedition.all_trades t JOIN expedition.users u ON u.id=t.maker_id WHERE t.status='open' ORDER BY t.created_at DESC LIMIT 50`,
    );
  } catch {
    return NextResponse.json(
      { error: "The trade board could not load. Try again." },
      { status: 503 },
    );
  }
}
