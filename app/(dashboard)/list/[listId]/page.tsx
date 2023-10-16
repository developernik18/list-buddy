import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getListInfo } from "@/util/server-functions/getListInfo";
import { redirect } from "next/navigation";
import DisplayItem from "./DisplayItem";
import { sortListItems } from "@/util/sort-functions/sortListItems";
import { getListItems } from "@/util/server-functions/getListItems";


export default async function ListInDetail({
  params,
}: {
  params: { listId: number };
}) {
  const {
    data: list,
    errorMessage: listErrorMessage
  } = await getListInfo(params.listId);

  if (listErrorMessage || list === null) redirect("/login");

  let { itemsArray, errorMessage: itemsArrayErrorMessage } 
    = await getListItems(
      list.id,
      list.list_key
    );

  if (itemsArray) {
    itemsArray = sortListItems(itemsArray);
  }



  return (
    <main className="bg-gray-50 min-h-[90vh]">
      <section className="container px-5 md:px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        <DisplayItem list={list} itemsArray={itemsArray}/>
      </section>
    </main>
  );
}
