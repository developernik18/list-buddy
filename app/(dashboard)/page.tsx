import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getListItems } from "@/util/server-functions/getListItems";
import { Item } from "@/types/item";
import { ListItems } from "@/types/listItems";
import { sortListItems } from "@/util/sort-functions/sortListItems";
import { isArrayEmpty } from "@/util/validation/empty";
import { DeleteList } from "./DeleteList";
import { FiEdit } from "react-icons/fi";

const getLists = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.from("lists").select();

  if (error) {
    // console.log(error);
  }

  return data;
};

export default async function Home() {
  const lists = await getLists();
  const listItems: ListItems[] = [];

  let displayList: boolean = false;

  if (lists) {
    displayList = isArrayEmpty(lists);
  }

  if (lists) {
    for (const list of lists) {
      let items = await getListItems(list.id, list.list_key);
      if (items) {
        items = sortListItems(items);
      }

      let shouldHideItems = false;
      let noItemPresent = false;

      if (items) {
        if (items?.length > 4) {
          shouldHideItems = true;
        } else if (items.length === 0) {
          noItemPresent = true;
        }
      }

      listItems.push({
        ...list,
        items: items,
        shouldHideItems,
        noItemPresent,
      });
    }
  }

  return (
    <main className="container px-5 md:px-10 py-10 mx-auto">
      <div className="flex flex-row flex-wrap">
        {displayList &&
          listItems?.map((list) => {
            return (
              <div
                className="flex flex-col 
                  basis-full md:basis-1/2 xl:basis-1/3 
                  p-0 md:p-5 py-5"
                key={list.id}
              >
                <div className="shadow bg-white">
                  <h2
                    className="card-header"
                  >
                    <span>{list.title}</span>
                    <span className="flex flex-row gap-1">
                      <Link href={"/list/" + list.id + "/edit-list"} className=" w-6">
                        <FiEdit />
                      </Link>
                      <span className=" w-6">
                        <DeleteList list={list}/>
                      </span>
                    </span>
                  </h2>
                  <section className=" relative h-64 max-h-64 overflow-hidden">
                    {list.noItemPresent && (
                      <div className="flex justify-center p-5">
                        No Items in the list
                      </div>
                    )}

                    {list.items &&
                      list.items.map((item: Item) => {
                        return (
                          <div
                            className="px-5 py-3 flex flex-row"
                            key={item.id}
                          >
                            <div className="basis-1/2">{item.name}</div>
                            <div className="divider basis-1/4">-</div>
                            <div className="basis-1/2">
                              {item.quantity + " " + item.unit}
                            </div>
                          </div>
                        );
                      })}

                    <Link
                      href={"/list/" + list.id}
                      className="text-center 
                      bg-gray-50 hover:bg-primary-default 
                      text-primary-default hover:text-white
                      opacity-90 py-3 
                      absolute bottom-0 left-0 right-0 z-2"
                    >
                      <span className="font-medium">
                        Open List
                      </span>
                    </Link>
                  </section>
                </div>
              </div>
            );
          })}

        {!displayList && (
          <div className="flex justify-center text-center p-10 text-xl w-full">
            No List created yet.
          </div>
        )}
      </div>

      {/* Create list button container */}
      <div className="create-list-button-container flex flex-row justify-center mt-5">
        <Link href={"/create-new-list"} className="primary-button">
          Create New List
        </Link>
      </div>
    </main>
  );
}
