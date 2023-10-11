import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  const request = await req.json();
  const supabase = createRouteHandlerClient({cookies});

  const {data: {session}} = await supabase.auth.getSession();

  const response = await supabase
                          .from('lists')
                          .update({'title': request.title, 'share_with': request.share_with})
                          .eq('id', request.id)
                          .eq('user_id', session?.user.id)
                          .select()

  return NextResponse.json(response.data, {
    status: response.status,
    statusText: response.statusText
  });
}