"use client"

import Checkbox from "@/components/Checkbox";
import { FiEdit } from "react-icons/fi";
import Delete from "../../../../components/Delete";
import { currencyValueToLabel } from "@/util/selection-list/for-currency";
import SimpleItem from "./SimpleItem";
import AddItem from "./AddItem";
import { ListWithoutOrigin } from "@/types/list";
import Link from "next/link";
import { Item } from "@/types/item";
import { useState } from "react";


export default function DisplayItem({list, itemsArray}: {list: ListWithoutOrigin, itemsArray: Item[]}) {
  let [isModalOpen, setIsModalOpen] = useState(false);
  let showTable = false;

  if (itemsArray.length) {
    showTable = true;
  } else {
    showTable = false;
  }

  return (
    <>
      {!showTable && list && (
        <section
          className="w-full lg:w-4/5 xl:w-/5 mx-auto 
        flex flex-col justify-center align-middle"
        >
          <span className=" text-red-500 font-medium text-xl text-center">
            No Items present in {list.title} List.
          </span>
          <div className="create-list-button-container flex flex-row justify-center mt-10">
            <Link
              href={"/list/" + list.id + "/add-items"}
              className="primary-button"
            >
              Add Items
            </Link>
          </div>
        </section>
      )}

      {showTable && list && (
        <section className="w-full mx-auto">
          <div 
            className="top bg-white border-b-2 
            p-3 px-5 md:px-10 
            text-center lg:text-left font-medium text-xl"
          >
            <span className="text-secondary-default">
              {list?.title}
            </span>
          </div>

          {/* For desktop view */}
          <section className="p-0 bg-white shadow-md hidden lg:flex">
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
                            list.id +
                            "/" +
                            item?.id +
                            "/edit"
                          }
                          className="pl-5"
                        >
                          <FiEdit />
                        </Link>
                        <span className="px-5">
                          <Delete item={item} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {/* For mobile view */}
          <section className="p-0 bg-white-shadow-md flex flex-col lg:hidden">
            {itemsArray.map(item => {
              return <SimpleItem item={item} key={item.id} />
            })}
          </section>

          <div className="create-list-button-container 
            hidden md:flex flex-row justify-center mt-10 ">
            <Link
              href={"/list/" + list.id + "/add-items"}
              className="primary-button"
            >
              Add more items
            </Link>
          </div>

          <div className="create-list-button-container 
          flex flex-row justify-center mt-10 md:hidden">
            <div
              onClick={() => setIsModalOpen(true)}
              className="primary-button cursor-pointer"
            >
              Add more items
            </div>
          </div>
        </section>
      )}

      {list && isModalOpen && (
        <AddItem list={list} setIsModalOpen={setIsModalOpen}/>
      )}
    </>
  );
}