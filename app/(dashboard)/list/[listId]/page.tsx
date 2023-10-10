import Link from "next/link";
import { FiArrowLeft, FiEdit, FiTrash } from "react-icons/fi";
import { getListInfo } from "@/util/server-functions/getListInfo";
import { getListItems } from "@/util/server-functions/getListItems";
import Checkbox from "@/components/Checkbox";
import { redirect } from "next/navigation";
import { sortListItems } from "@/util/sort-functions/sortListItems";
import Delete from "../../../../components/Delete";
import { currencyValueToLabel } from "@/util/selection-list/for-currency";

export default async function ListInDetail({
  params,
}: {
  params: { listId: number };
}) {
  const {
    data: listInfo,
    errorMessage: listErrorMessage
  } = await getListInfo(params.listId);

  if (listErrorMessage) redirect("/login");

  let { itemsArray, errorMessage: itemsArrayErrorMessage } = await getListItems(
    params.listId,
    listInfo?.list_key
  );

  if (itemsArray) {
    itemsArray = sortListItems(itemsArray);
  }
  let showTable = false;

  if (itemsArray.length) {
    showTable = true;
  } else {
    showTable = false;
  }

  return (
    <main className="bg-gray-50 min-h-[90vh]">
      <section className="container px-5 md:px-10 py-10 mx-auto flex flex-col gap-2">
        <Link href={"/"} className="w-10">
          <FiArrowLeft />
        </Link>

        {!showTable && (
          <section
            className="w-full lg:w-4/5 xl:w-/5 mx-auto 
          flex flex-col justify-center align-middle"
          >
            <span className=" text-red-500 font-medium text-xl text-center">
              No Items present in {listInfo.title} List.
            </span>
            <div className="create-list-button-container flex flex-row justify-center mt-10">
              <Link
                href={"/list/" + listInfo.id + "/add-items"}
                className="primary-button"
              >
                Add Items
              </Link>
            </div>
          </section>
        )}

        {showTable && (
          <section className="w-full mx-auto">
            <div className="top bg-white border-b-2 p-3 px-5 md:px-10 text-left font-medium text-xl">
              <span className="text-secondary-default">{listInfo?.title}</span>
            </div>

            <section className="p-0 md:p-10 bg-white shadow-md">
              <table className="w-full">
                <thead className=" bg-orange-100 text-secondary-default h-10">
                  <tr>
                    <th>Item</th>
                    <th>Quantity with Unit</th>
                    <th>Price</th>
                    <th className="hidden md:table-cell">Expiry Date</th>
                    <th>Purchased</th>
                    <td></td>
                  </tr>
                </thead>

                <tbody className=" accent-orange-600">
                  {itemsArray.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className="text-center h-14 even:bg-gray-100 odd:bg-white"
                      >
                        <td>{item.name}</td>
                        <td>{item.quantity + " " + item.unit}</td>
                        <td>
                          {currencyValueToLabel(item.currency) +
                            " " +
                            item.price}
                        </td>
                        <td className="hidden md:block">
                          {item.expiry_date && String(item.expiry_date)}
                          {!item.expiry_date && <span> - </span>}
                        </td>
                        <td>
                          <Checkbox isChecked={item.purchased} item={item} />
                        </td>
                        <td className="flex flex-row gap-2 items-center justify-center h-14">
                          <Link
                            href={
                              "/list/" +
                              params.listId +
                              "/" +
                              item?.id +
                              "/edit"
                            }
                          >
                            <FiEdit />
                          </Link>
                          <span>
                            <Delete item={item} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            <div className="create-list-button-container flex flex-row justify-center mt-10">
              <Link
                href={"/list/" + listInfo.id + "/add-items"}
                className="primary-button"
              >
                Add more items
              </Link>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
