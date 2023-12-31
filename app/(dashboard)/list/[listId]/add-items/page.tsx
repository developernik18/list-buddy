import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import ItemAdditionForm from "./ItemAdditionForm";
import { getListInfo } from "@/util/server-functions/getListInfo";


export default async function AddToList({ params }: {params: {listId: number}}) {
  const { data: list, errorMessage: listErrorMessage } =
  await getListInfo(params.listId);



  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-5 md:px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/list/"+ params.listId} className="w-10">
          <FiArrowLeft />
        </Link>

        {list && (
          <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto">
            <div className="top bg-orange-100 p-3 text-center font-medium text-xl">
              Add to 
              <span className="text-secondary-default">
                  {' "' + list?.title + '" '} 
              </span>  
              List
            </div>

            <ItemAdditionForm listId={params.listId} listKey={list.list_key}/>
          </section>
        )}


      </section>
    </main>
  )
}
