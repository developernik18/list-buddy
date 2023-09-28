import { Item } from "./item"

export type ListItems = {
  id: string,
  created_at: Date,
  title: string,
  user_id: string,
  list_key: string,
  shouldHideItems: boolean,
  items: Item[]
}