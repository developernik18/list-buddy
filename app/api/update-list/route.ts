import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const request = await req.json();

  console.log(request);

  return NextResponse.json('Check');
}