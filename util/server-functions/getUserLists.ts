import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getErrorMessage from "./getErrorMessage";

export const getUserLists = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {data: {session}} = await supabase.auth.getSession();

  const {data, error, statusText, status} = await supabase
                          .from("lists")
                          .select('id, title, list_key, user_email, share_with')
                          .eq('user_id', session?.user.id);

  let errorMessage = getErrorMessage(status, statusText);
  
  return {data, errorMessage};
};
