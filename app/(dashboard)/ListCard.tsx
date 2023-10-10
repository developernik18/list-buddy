import Link from "next/link";
import { FiEdit, FiShare2 } from "react-icons/fi";
import { DeleteList } from "./DeleteList";
import { ListItems } from "@/types/listItems";
import { Item } from "@/types/item";


export function ListCard({list}: {list: ListItems}) {
  return (
    <div
      className="flex flex-col 
        basis-full md:basis-1/2 xl:basis-1/3 
        p-0 md:p-5 py-5"
    >
      <div className="shadow bg-white fade-in-slide-up">
        <h2
          className="card-header"
        >
          <span>
            {list.title} 
            <span className="text-sm text-gray-800">
              {list.origin === 'shared' ? " : (" + list.origin + ")" : ""}
            </span>
          </span>
          
          <span className="flex flex-row gap-1">
            {list.origin === 'self' && (
              <Link href={"/list/" + list.id + "/share-list"} className=" w-6">
                <FiShare2 />
              </Link>
            )}

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

          {list.itemsArray &&
            list.itemsArray.map((item: Item) => {
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
  )
}