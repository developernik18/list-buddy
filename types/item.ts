export type Item = {
  id: number,
  name: string,
  created_at: Date,
  expiry_date: Date,
  quantity: number,
  unit: string,
  currency: string,
  price: number,
  notes: string,
  user_email: string,
  purchased: boolean,
  list_key: string,
  list_id: number
}