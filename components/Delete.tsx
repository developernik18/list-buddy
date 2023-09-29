"use client"

import { Item } from "@/types/item";
import { FiTrash } from "react-icons/fi"

export default function Delete({item} : {item: Item}) {

  const handleDelete = async () => {
    const response = await fetch('http://localhost:3000/api/delete-item', {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
    console.log(response);
  }

  return (
    <>
      <FiTrash 
        className=" cursor-pointer"
        onClick={handleDelete}
      />
    </>
  )
}