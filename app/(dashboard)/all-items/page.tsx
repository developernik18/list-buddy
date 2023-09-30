import { Item } from "@/types/item";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Delete from "@/components/Delete";
import Checkbox from "@/components/Checkbox";
import { FiEdit } from "react-icons/fi";

export default async function AllItems() {
  const supabase = createServerActionClient({cookies})
  let allItems: Item[] | null = [];
  let displayItems: boolean = false;
  const {data: {session}} = await supabase.auth.getSession();

  const response = await supabase
                  .from('items')
                  .select()
                  .eq('user_id', session?.user.id)

  if(response.status === 200) {
    allItems = response.data;
  }

  if(allItems) {
    if(allItems.length > 0) {
      displayItems = true;
    } else {
      displayItems = false;
    }
  }



  return (
    <main className="container px-10 py-10 mx-auto">

      {!displayItems && (
        <div>
          <div className="text-center p-10 text-xl ">
            No items Listed.
          </div>
          {/* Create list button container */}
          <div className="create-list-button-container flex flex-row justify-center">
            <Link
              href={"/create-new-list"}
              className="primary-button">
              Create New List
            </Link>
          </div>
        </div>
        
      )}

      {displayItems && (
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
              {allItems?.map(item => {
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
                      <Link href={"/list/" + item.list_id + "/" + item?.id + "/edit"}>
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

      )}

        
    </main>
  );
}