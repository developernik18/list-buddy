import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FiArrowRight } from "react-icons/fi";

const getLists = async () => {
  const supabase = createServerComponentClient({ cookies })

  const {data, error} = await supabase.from('lists')
    .select();

  if(error) {
    console.log(error);
  }

  return data;
}

export default async function Home() {
  const lists = await getLists();

  return (
    <main className="container px-10 py-10 mx-auto">
      <div className="flex flex-row flex-wrap">
        {lists?.map(list => {
          return (
            <div className="flex basis-1/3 flex-col p-5" key={list.id}>
              <div className="shadow" >
                <h2 className=" bg-indigo-800 p-5 text-white text-lg font-medium py-3
                  flex flex-row justify-between items-center">
                  {list.title}
                  <Link href={"/list/" + list.id}>
                    <FiArrowRight />
                  </Link>
                </h2>
                <div className="p-5 flex flex-row">
                  <div className="basis-1/2">
                    Rice
                  </div>
                  <div className="divider basis-1/4">
                    -
                  </div>
                  <div className="basis-1/2">
                    Quantity
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create list button container */}
      <div className="create-list-button-container flex flex-row justify-center">
        <Link
          href={"/create-new-list"}
          className="primary-button">
          Create New List
        </Link>
      </div>
    </main>
  )
}
