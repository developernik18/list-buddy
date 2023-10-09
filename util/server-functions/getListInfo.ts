import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getErrorMessage from "./getErrorMessage";

export const getListInfo = async (id: number) => {
  const supabase = createServerActionClient({cookies});

  const {data, error, status, statusText} = await supabase
    .from('lists')
    .select()
    .eq('id', id)
    .single()

  let errorMessage = getErrorMessage(status, statusText);

  return {
    data,
    errorMessage
  }
}
