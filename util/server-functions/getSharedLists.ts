import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getErrorMessage from "./getErrorMessage";

export const getSharedLists = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {data: {session}} = await supabase.auth.getSession();

  const { data, error, status, statusText } = await supabase
                                  .from("lists")
                                  .select('id, title, list_key, user_email, share_with')
                                  .contains('share_with', [session?.user.email])
                                  .neq('user_email', session?.user.email);


  let errorMessage = getErrorMessage(status, statusText);

  return {data, errorMessage};
}