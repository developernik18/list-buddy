import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  const request = await req.json();
  const supabase = createRouteHandlerClient({cookies});

  
  const {data, error} = await supabase
                          .from('items')
                          .delete()
                          .eq("user_id", request.user_id)
                          .eq("list_key", request.list_key)
                          .eq("id", request.id)

  if(data) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json("Error in update", {status: 500});
  }


}