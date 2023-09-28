import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { FiArrowRight } from "react-icons/fi";
import { getListItems } from "@/util/server-functions/getListItems";
import { Item } from "@/types/item";
import { ListItems } from "@/types/listItems";
import { sortListItems } from "@/util/sort-functions/sortListItems";

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
  const listItems : ListItems[] = [];

  if(lists) {
    for(const list of lists) {
      let items = await getListItems(list.id, list.list_key);
      if(items) {
        items = sortListItems(items);
      }

      let shouldHideItems = false;

      if(items){
        if(items?.length > 4) {
          shouldHideItems = true
        }
      }

      listItems.push({
        ...list,
        items: items,
        shouldHideItems
      })
    }
  }


  return (
    <main className="container px-10 py-10 mx-auto">
      <div className="flex flex-row flex-wrap">
        {listItems && listItems?.map(list => {
          return (
            <div className="flex basis-full md:basis-1/2 lg:basis-1/3 flex-col p-5" key={list.id}>
              <div className="shadow" >
                <h2 className=" bg-indigo-50 p-5 text-primary-default text-lg font-medium py-3
                  flex flex-row justify-between items-center border-b-2">
                  {list.title}
                  <Link href={"/list/" + list.id}>
                    <FiArrowRight />
                  </Link>
                </h2>
                <section className=" relative h-64 max-h-64 overflow-hidden">
                  {list.items && list.items.map((item: Item) => {
                    return (
                      <div className="px-5 py-3 flex flex-row" key={item.id}>
                        <div className="basis-1/2">
                          {item.name}
                        </div>
                        <div className="divider basis-1/4">
                          -
                        </div>
                        <div className="basis-1/2">
                          {item.quantity + ' ' + item.unit}
                        </div>
                      </div>
                    )
                  })}
                  
                  {list.shouldHideItems && (
                    <Link 
                      href={"/list/" + list.id}
                      className="text-center 
                      bg-indigo-100 opacity-90  py-3 
                      absolute bottom-0 left-0 right-0 z-2">
                      <span className="opacity-100 text-primary-default font-medium">
                        View More
                      </span>
                    </Link>
                  )}
                </section>

                
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
