import Link from "next/link";
import { FiArrowLeft, FiEdit, FiTrash } from "react-icons/fi";

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

        <section className="p-5">
          <table className="w-full">
            <thead className=" bg-orange-100 text-secondary-default h-10">
              <tr>
                <th>
                  Item
                </th>
                <th>
                  Quantity with Unit
                </th>
                <th>
                  Expiry
                </th>
                <th aria-colspan={2}>
                  Purchased
                </th>
              </tr>

            </thead>

            <tbody>
              <tr className="text-center h-14">
                <td>
                  Rice
                </td>
                <td>
                  1 kg
                </td>
                <td>
                  May 2024
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td className="flex flex-row gap-2 items-center justify-center h-14">
                  <span>
                    <FiEdit />
                  </span>
                  <span>
                    <FiTrash />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>


      </section>

    </section>
  </main>
  )
}
