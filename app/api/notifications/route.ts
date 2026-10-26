import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { data: session } = await auth.getSession();
    if (!session?.user)
      return NextResponse.json([], {
        headers: { "Cache-Control": "no-store" },
      });
    const sql = db();
    const rows =
      await sql`SELECT n.id,u.username,n.offered,n.received,n.created_at FROM expedition.trade_notifications n JOIN expedition.users u ON u.id=n.taker_id WHERE n.user_id=${session.user.id}::uuid AND n.read_at IS NULL ORDER BY n.created_at DESC LIMIT 50`;
    return NextResponse.json(rows, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Trade notifications could not load." },
      { status: 503 },
    );
  }
}
