import { getListInfo } from "@/util/server-functions/getListInfo"
import ListEdit from "./ListEditForm";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default async function EditList({params}: {params:{listId:number}}) {
  const {
    data: list,
    errorMessage: listErrorMessage
  } = await getListInfo(params.listId);


  return (
    <main className="flex flex-row justify-center items-center">
      <section className="container px-5 sm:px-10 py-10 mx-auto flex flex-col">
        <Link href={"/"}>
          <FiArrowLeft />
        </Link>
        <ListEdit list={list}/>
      </section>
    </main>
  )
}