import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const supabase = createRouteHandlerClient({cookies});
  
  const {data, error} = await supabase
                          .from('Items')
                          .update({purchased: request.purchased})
                          .eq("list_id", Number(request.list_id))
                          .eq("list_key", request.list_key)
                          .eq("id", request.id)
                          .select()
                          .single()



  if(data) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json("Error in update", {status: 500});
  }


}