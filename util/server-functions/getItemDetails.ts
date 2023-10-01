import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
// import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const getItemDetails = async (list_key: string, list_id: number, itemId: number, ) => {
  try{
  
    const supabase = createServerActionClient({cookies});
    const {data, error} = await supabase
      .from('items')
      .select()
      .eq('list_key', list_key)
      .eq('list_id', list_id)
      .eq('id', itemId)
      .single()
  
    if(data) {
      return data;
    } else if(error) {
      // console.log(error);
      
    }
  } catch {
    // redirect("/login");
  }
}
