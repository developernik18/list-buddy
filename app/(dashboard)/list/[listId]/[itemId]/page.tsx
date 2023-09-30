import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { cookies } from "next/headers"
import { Item } from "@/types/item"
import Checkbox from "@/components/Checkbox"
import Delete from "@/components/Delete"
import { FiEdit } from "react-icons/fi"
import { redirect } from "next/navigation"

export default async function EditItem({ params }: {params: {listId: number, itemId: number}}) {
  let item: Item | null = null;
  const supabase = createServerComponentClient({cookies});
  
  const {data: {session}} = await supabase.auth.getSession();

  const response = await supabase
                    .from('items')
                    .select()
                    .eq('id', params.itemId)
                    .single()

  if(response.status === 200) {
    item = response.data;
  } else {
    redirect("/login")
  }


  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        <section className="flex justify-center items-center text-xl">
          {item && (
            <section className="flex flex-row gap-5 p-10  bg-white min-w-[60%] justify-between">
              <div className="content flex flex-row gap-5">
                <div className="flex flex-col gap-2 text-gray-600">
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
              </div>
              <div className="actions flex flex-row gap-5">
                <div className="flex flex-col items-center">
                  Purchased 
                  <Checkbox isChecked={item.purchased} item={item} />
                </div>
                <div>
                  <Link href={"/list/" + params.listId + "/" + item?.id + "/edit"}>
                    Edit 
                    <FiEdit />
                  </Link>
                </div>
                <div>
                  Delete
                  <Delete item={item}/>
                </div>
              </div>
            </section>
                             
          )}


        </section>
        


      </section>
    </main>
  )
}
