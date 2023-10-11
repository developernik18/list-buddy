import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { addListOrigin, getListInfo } from "@/util/server-functions/getListInfo";
import ItemEditForm from "./ItemEditForm";
import { getItemDetails } from "@/util/server-functions/getItemDetails";
import { Item } from "@/types/item";
import { ListWithoutOrigin } from "@/types/list";

export default async function EditItem({
  params,
}: {
  params: { listId: number; itemId: number };
}) {
  const { 
    data: list, 
    errorMessage: listErrorMessage 
  } = await getListInfo(params.listId);

  let itemDetails: Item | null = null;

  if(list) {
    itemDetails = await getItemDetails(
      list.list_key,
      params.listId,
      params.itemId
    );
  }

  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-5 md:px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/list/" + params.listId} className="w-10">
          <FiArrowLeft />
        </Link>
        
        {list && (
          <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto">
            <div className="top bg-orange-100 p-3 text-center font-medium text-xl">
              Edit
              <span className="text-secondary-default">
                {' "' + itemDetails?.name + '" '}
              </span>
              from
              <span className="text-secondary-default">
                {' "' + list?.title + '" '}
              </span>
              List
            </div>

            {itemDetails && (
              <ItemEditForm listDetails={addListOrigin(list)} itemDetails={itemDetails} />
            )}
          </section>
        )}

      </section>
    </main>
  );
}
