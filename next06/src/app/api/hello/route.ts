import { NextResponse } from "next/server"

//statically evaluated route
export async function GET() {
  return NextResponse.json({"message": 'Hello, Next.js!'});
}
