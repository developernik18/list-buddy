"use client"

import { Item } from "@/types/item";
import { FiChevronDown, FiChevronUp, FiEdit } from "react-icons/fi";
import Delete from "@/components/Delete";
import Link from "next/link";
import ExpandedItem from "./ExpandedItem";
import { useState } from "react";


export default function SimpleItem({item}: {item: Item}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div key={item.id}>
      <div 
        className="collapsed-item 
        p-3 my-2 rounded 
        bg-indigo-50 
        flex flex-row justify-between items-center"
      >
        <div className="item-and-quantity flex flex-row gap-5">
          <div className="item-name w-36">
            {item.name}
          </div>
          <div className="item-quantity">
            {item.quantity} {" "+ item.unit}
          </div>
        </div>
        <div className="action-icons flex flex-row">

          <div 
            className="px-3 cursor-pointer" 
            onClick={isExpanded? () => setIsExpanded(false) : () => setIsExpanded(true)}
          >
            {isExpanded && <FiChevronUp />}
            {!isExpanded && <FiChevronDown />}
          </div>
          <Link
            href={
              "/list/" +
              item.list_id +
              "/" +
              item.id +
              "/edit"
            }
            className="px-3"
          >
            <FiEdit />
          </Link>
          <div className="pl-3 pr-5">
            <Delete item={item} />
          </div>
        </div>
      </div>
      {isExpanded && (
        <ExpandedItem item={item} isExpanded={isExpanded}/>
      )}
    </div>
  )
}