import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { cookies } from "next/headers"
import { Item } from "@/types/item"

export default async function EditItem({ params }: {params: {listId: number, itemId: number}}) {
  let item: Item | null = null;
  const supabase = createServerComponentClient({cookies});

  const response = await supabase
                    .from('items')
                    .select()
                    .eq('id', params.itemId)
                    .single()

  if(response.status === 200) {
    item = response.data;
  }

  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        <section className="flex justify-center items-center ">
          {item && (
            <section className="flex flex-row gap-5">
              <div className="flex flex-col gap-2">
                <div>
                  Name : 
                </div>
                <div>
                  Quantity : 
                </div>
                <div>
                  Price :
                </div>
                <div>
                  Notes :
                </div>
                <div>
                  Purchased :
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  {item?.name}
                </div>
                <div>
                  {item?.quantity + ' ' + item?.unit}
                </div>
                <div>
                  {item?.currency+ ' ' + item?.price}
                </div>
                <div>
                  {String(item?.notes)}
                </div>
                <div>
                  {item.purchased ? "Yes" : "No"}
                </div>
              </div>

            </section>
          )}

        </section>
        


      </section>
    </main>
  )
}
