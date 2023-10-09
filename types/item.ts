export type Item = {
  id: number,
  name: string,
  expiry_date: Date,
  quantity: number,
  unit: string,
  currency: string,
  price: number,
  notes: string,
  purchased: boolean,
  list_key: string,
  list_id: number
}