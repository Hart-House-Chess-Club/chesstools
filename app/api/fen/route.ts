import { NextResponse } from "next/server";

export async function GET() {
return NextResponse.json(
    {
        message: "successfully hit /api/fen"
    },
    { status: 200 },
    );
}
