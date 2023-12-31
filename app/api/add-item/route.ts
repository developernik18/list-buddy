import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const supabase = createRouteHandlerClient({cookies});
  const {data: {session}} = await supabase.auth.getSession();

  const {data, error} = await supabase
                        .from('items')
                        .insert({
                          ...req,
                          user_id: session?.user.id
                        })
                        .select()
                        .single()
  if(data) {
    return NextResponse.json(data);
  } 

  return NextResponse.json({error: error}, {status: 500} );
}