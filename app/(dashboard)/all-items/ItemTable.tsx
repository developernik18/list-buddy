"use client"

import Delete from "@/components/Delete";
import Checkbox from "@/components/Checkbox";
import { FiEdit } from "react-icons/fi";
import { currencyValueToLabel } from "@/util/selection-list/for-currency";
import { Item } from "@/types/item";
import Link from "next/link";
import { forItemFilter } from "@/util/selection-list/for-item-filter";
import { useState } from "react";


export default function ItemTable({allItems}: {allItems: Item[]}) {
  const [filter, setFilter] = useState(forItemFilter[0].value);

  const items = allItems.filter(item => {
    if(filter === "purchased") {
      return item.purchased;
    } else if(filter === "toPurchase") {
      return !item.purchased;
    } else {
      return true;
    }
  })

  return (
    <div className=" flex flex-col gap-5 relative">
      <form className=" w-60 self-end">
        <div className="text-lg mb-2">
          Filter by:
        </div>
        <select 
          name="unit" 
          id="quantity-unit" 
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 bg-white  w-full"
          value={filter}
        >
          {forItemFilter.map(option => {
            return (
              <option 
                value={option.value} 
                key={option.label}  
              >
                {option.label}
              </option>
            )
          })}
        </select>

      </form>
      

      <section className="bg-white shadow-md">
        


        <table className="w-full">
          <thead className=" bg-orange-50 text-secondary-default h-10">
            <tr>
              <th>
                Item
              </th>
              <th>
                Quantity with Unit
              </th>
              <th>
                Price
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
            {items?.map(item => {
              return (
                <tr key={item.id}
                  className="text-center h-14 even:bg-gray-50 odd:bg-white">
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.quantity + ' ' + item.unit}
                  </td>
                  <td>
                    {currencyValueToLabel(item.currency) + ' ' + item.price}
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
    </div>
  );
}