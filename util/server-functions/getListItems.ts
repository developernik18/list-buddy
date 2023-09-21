import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getListItems(listId: number) {
  console.log(listId);

  try {
    const supabase = createServerComponentClient({cookies});

    const {data: {session}} = await supabase.auth.getSession();

    const {data, error} = await supabase
                                  .from ('Items')
                                  .select();

    return data;
  } catch {
    redirect('/login');
  }

}