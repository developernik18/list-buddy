 export type List = {
  id: number,
  title: string,
  list_key: string,
  user_email: string,
  origin: 'self' | 'shared'
 }

 export type ListWithoutOrigin = {
  id: number,
  title: string,
  list_key: string,
  user_email: string
 }