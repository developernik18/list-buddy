import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { getListInfo } from "@/util/server-functions/getListInfo";
import ItemEditForm from "./ItemEditForm";
import { List } from "@/types/list";
import { getItemDetails } from "@/util/server-functions/getItemDetails";
import { Item } from "@/types/item";

export default async function EditItem({ params }: {params: {listId: number, itemId: number}}) {
  const listDetails:List = await getListInfo(params.listId);
  const itemDetails:Item = await getItemDetails(listDetails.list_key, params.listId, params.itemId)

  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/list/" + params.listId} className="w-10">
          <FiArrowLeft />
        </Link>

        <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto">
          <div className="top bg-orange-100 p-3 text-center font-medium text-xl">
            Edit 
            <span className="text-secondary-default">
                {' "' + itemDetails?.name + '" '} 
            </span>  
            from
            <span className="text-secondary-default">
                {' "' + listDetails?.title + '" '} 
            </span>  
            List
          </div>

          {itemDetails && (
            <ItemEditForm listDetails={listDetails} itemDetails={itemDetails}/>
          )}

        </section>
        
      </section>
    </main>
  )
}
