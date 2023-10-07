import { RangeOfData } from "@/types/rangeOfData";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getListItems(listId: number, listKey: string) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("items")
    .select()
    .eq("list_id", listId)
    .eq("list_key", listKey);

  return data;
}

export async function getListItemsInRange(
  listId: number,
  listKey: string,
  itemRange: RangeOfData
) {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
      .from("items")
      .select()
      .eq("list_id", listId)
      .eq("list_key", listKey)
      .range(itemRange.lowerValue, itemRange.lowerValue + itemRange.count - 1);

    return data;
}
