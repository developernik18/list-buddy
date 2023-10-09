import { RangeOfData } from "@/types/rangeOfData";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getErrorMessage from "./getErrorMessage";
import { Item } from "@/types/item";

export async function getListItems(listId: number, listKey: string) {
  const supabase = createServerComponentClient({ cookies });
  let itemsArray: Item[] = [];

  const { data, error, status, statusText  } = await supabase
    .from("items")
    .select('id, name, expiry_date, quantity, unit, currency, price, notes, purchased, list_key, list_id')
    .eq("list_id", listId)
    .eq("list_key", listKey);

  let errorMessage = getErrorMessage(status, statusText);

  if(status === 200 && data) {
    itemsArray = data;
  }


  return {itemsArray, errorMessage};
}



export async function getListItemsInRange(
  listId: number,
  listKey: string,
  itemRange: RangeOfData
) {
    const supabase = createServerComponentClient({ cookies });
    let itemsArray: Item[] = [];

    const { data, error, status, statusText } = await supabase
      .from("items")
      .select('id, name, expiry_date, quantity, unit, currency, price, notes, purchased, list_key, list_id')
      .eq("list_id", listId)
      .eq("list_key", listKey)
      .range(itemRange.lowerValue, itemRange.lowerValue + itemRange.count - 1);

    let errorMessage = getErrorMessage(status, statusText);

    if(status === 200 && data) {
      itemsArray = data;
    }

    return {itemsArray, errorMessage};
}
