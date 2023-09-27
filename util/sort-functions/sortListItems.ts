import { Item } from "@/types/item";

export function sortListItems(items: Item[]) {
  let sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
  return sortedItems;
}