import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function getListItems(listId: number, listKey: string) {

  try {
    const supabase = createServerComponentClient({cookies});

    const {data: {session}} = await supabase.auth.getSession();

    const {data, error} = await supabase
                                  .from ('items')
                                  .select()
                                  .eq('list_id', listId)
                                  .eq('list_key', listKey)

    return data;
  } catch {
    // redirect('/login');
    return null;
  }

}