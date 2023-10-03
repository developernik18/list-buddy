"use client"

import { List } from "@/types/list";
import { FiTrash } from "react-icons/fi"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export function DeleteList({list}: {list: List}) {

  const handleListDelete = async () => {
    const response = await fetch(baseUrl + '/api/delete-list', {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(list)
    })

    if(response.status === 200) {
      location.reload();
    }
  };

  return (
    <div onClick={handleListDelete}>
      <FiTrash />
    </div>
  )
}