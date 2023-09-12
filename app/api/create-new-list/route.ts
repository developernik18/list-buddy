import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const list = await request.json();

  // get supabase instance.
  const supabase = createRouteHandlerClient({ cookies });

  // get the current user session.
  const {data: {session}} = await supabase.auth.getSession();

  // insert into list table.
  const {data, error} = await supabase.from('lists')
    .insert({
      ...list,
      user_email: session?.user.email
    })
    .select()
    .single()



  return NextResponse.json({data, error})
}