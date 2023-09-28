"use client"

import { List } from "@/types/list";
import { FiTrash } from "react-icons/fi"

export default function Delete({item} : {item: List}) {

  const handleDelete = async () => {
    const response = await fetch('http://localhost:3000/api/delete-item', {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
    console.log('delete');
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