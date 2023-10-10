import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getErrorMessage from "./getErrorMessage";
import { List, ListWithoutOrigin } from "@/types/list";

export const getListInfo = async (id: number) => {
  const supabase = createServerActionClient({cookies});

  const {data, error, status, statusText} = await supabase
    .from('lists')
    .select('id, title, list_key, user_email, share_with')
    .eq('id', id)
    .single()

  let errorMessage = getErrorMessage(status, statusText);

  return {
    data,
    errorMessage
  }
}


export function addListOrigin(list: ListWithoutOrigin) {
  let isUserList: boolean = false;
  let newList:List;
  
  if(list.share_with) {
    isUserList = list.share_with.includes(list.user_email);
  }

  if(isUserList) {
    newList = {
      ...list,
      origin: 'self'
    }
  } else {
    newList = {
      ...list,
      origin: 'shared'
    }
  }

  return newList;
}