import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const getListInfo = async (id: number) => {
  try{
    const supabase = createServerActionClient({cookies});
    
    const {data: {session}} = await supabase.auth.getSession();

    const {data, error} = await supabase
      .from('lists')
      .select()
      .eq('id', id)
      .eq('user_email', session?.user.email)
      .single()
  
    if(data) {
      return data;
    } else if(error) {
      console.log(error);
      
    }
  } catch {
    redirect("/login");
  }
}
