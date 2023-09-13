import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import ItemAdditionForm from "./ItemAdditionForm";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type ListInfoType = {
  title: string,
  id: number,
  user_email: string
}


const getListInfo = async (id: string) => {
  const supabase = createServerActionClient({cookies});
  
  const {data: {session}} = await supabase.auth.getSession();

  const {data, error} = await supabase
    .from('lists')
    .select()
    .eq('id', Number(id))
    .single()

  return data;
}

export default async function AddToList({ params }: {params: {listTitle: string}}) {
  let listInfo = await getListInfo(params.listTitle)

  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto">
          <div className="top bg-orange-100 p-3 text-center font-medium text-xl">
            Add to 
            <span className="text-secondary-default">
                {' "' + listInfo.title + '" '} 
            </span>  
            List
          </div>

          <ItemAdditionForm />
        </section>

      </section>
    </main>
  )
}
