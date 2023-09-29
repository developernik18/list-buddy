import Link from "next/link";
import { FiArrowLeft, FiEdit, FiTrash } from "react-icons/fi";
import { getListInfo } from "@/util/server-functions/getListInfo";
import { getListItems } from "@/util/server-functions/getListItems";
import Checkbox from "@/components/Checkbox";
import { List } from "@/types/list";
import { Item } from "@/types/item";
import { redirect } from "next/navigation";
import { sortListItems } from "@/util/sort-functions/sortListItems";
import Delete from "../../../../components/Delete";

export default async function ListInDetail({ params }: { params: { listId: number } }) {
  const listInfo: List = await getListInfo(params.listId);
  if (!listInfo) redirect("/login");

  let listItems: Item[] | null = await getListItems(params.listId, listInfo?.list_key);
  if (listItems) {
    listItems = sortListItems(listItems);
  }
  let showTable = false;

  if (listItems?.length) {
    showTable = true;
  } else {
    showTable = false;
  }

  return (
    <main className="bg-gray-50 min-h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        {!showTable &&
          <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto 
          flex flex-col justify-center align-middle">
            <span className=" text-red-500 font-medium text-xl text-center">
              No Items present in {listInfo.title} List.
            </span>
            <div className="create-list-button-container flex flex-row justify-center mt-10">
              <Link
                href={"/list/" + listInfo.id + "/add-items"}
                className="primary-button">
                Add Items
              </Link>
            </div>
          </section>
        }

        {showTable &&
          <section className="w-full lg:w-4/5 xl:w-3/5 mx-auto">
            <div className="top bg-white border-b-2 p-3 px-10 text-left font-medium text-xl">
              <span className="text-secondary-default">
                {listInfo?.title}
              </span>
            </div>

            <section className="p-10 bg-white shadow-md">
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
                    <th>
                      Purchased
                    </th>
                    <td>

                    </td>
                  </tr>

                </thead>

                <tbody className=" accent-orange-600">
                  {listItems?.map(item => {
                    return (
                      <tr key={item.id}
                        className="text-center h-14 even:bg-gray-100 odd:bg-white">
                        <td>
                          {item.name}
                        </td>
                        <td>
                          {item.quantity + ' ' + item.unit}
                        </td>
                        <td>
                          {item.expiry_date && String(item.expiry_date)}
                          {!item.expiry_date && <span> - </span>}

                        </td>
                        <td>
                          <Checkbox isChecked={item.purchased} item={item} />
                        </td>
                        <td className="flex flex-row gap-2 items-center justify-center h-14">
                          <Link href={"/list/" + params.listId + "/" + item?.id + "/edit"}>
                            <FiEdit />
                          </Link>
                          <span>
                            <Delete item={item}/>
                          </span>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </section>

            <div className="create-list-button-container flex flex-row justify-center mt-10">
              <Link
                href={"/list/" + listInfo.id + "/add-items"}
                className="primary-button">
                Add more items
              </Link>
            </div>

          </section>
        }


      </section>
    </main>
  )
}
