import { getListInfo, addListOrigin } from "@/util/server-functions/getListInfo";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ListShareForm from "./ListShareForm";


export default async function ShareList({params} : {params: {listId: number}}) {
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
        {list &&
          <ListShareForm list={addListOrigin(list)}/>      
        }
      </section>
    </main>
  )
}