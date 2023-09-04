import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"

export default function ListTitle({ params }: {params: {listTitle: string}}) {
  
  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        <section>
          <div className="top bg-orange-100 p-3 text-center font-medium text-xl">
            Add to  {'"' +params.listTitle + '"'} List
          </div>
        </section>

      </section>
      

    </main>
  )
}
