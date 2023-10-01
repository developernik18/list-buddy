import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  const request = await req.json();
  const supabase = createRouteHandlerClient({cookies});

  const {data: {session}} = await supabase.auth.getSession();
  // console.log(request);
  
  const response = await supabase
                          .from('items')
                          .delete()
                          .eq("id", request.id)
                          .eq("user_id", session?.user.id);

  const statusText = 'Deleted Successfully';
  if(response.status === 204) {
    return NextResponse.json(statusText, {
      status: 200,
      statusText: statusText
    });
  } else {
    return NextResponse.json("Error while deletion", {
      status: response.status
    });
  }

}