import { Item } from "./item"

export type ListItems = {
  id: number,
  user_email: string,
  title: string,
  list_key: string,
  noItemPresent: boolean,
  origin: 'self' | 'shared',
  itemsArray: Item[],
  errorMessage: string,
  share_with: string[]
}