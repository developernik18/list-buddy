import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function ListInDetail({ params }: {params: {listTitle: string}}) {
  return (
    <main className="bg-gray-50 h-[90vh]">
    <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
      <Link href={"/"} className="w-10">
        <FiArrowLeft />
      </Link>

      <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto">
        <div className="top bg-orange-100 p-3 px-10 text-left font-medium text-xl">
          <span className="text-secondary-default">
              { params.listTitle } 
          </span>  
        </div>

      </section>

    </section>
  </main>
  )
}
