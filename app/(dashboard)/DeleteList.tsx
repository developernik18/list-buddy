"use client"

import ConfirmationBox from "@/components/ConfirmationBox";
import { List } from "@/types/list";
import { useState } from "react";
import { FiTrash } from "react-icons/fi"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export function DeleteList({list}: {list: List}) {
  const [boxOpen, setBoxOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleListDelete = async () => {
    setPending(true);
    let requestBody = {
      id: list.id,
    }

    const response = await fetch(baseUrl + '/api/delete-list', {
      method: "DELETE",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })

    if(response.status === 200) {
      location.reload();
    }
    setPending(false);
  };

  return (
    <>
      <div onClick={() => setBoxOpen(true)} className="cursor-pointer">
        <FiTrash />
      </div>
      {boxOpen && (
        <ConfirmationBox 
          deleteFunction={handleListDelete}
          cancelFunction={() => setBoxOpen(false)}
          confirmationStatement = {`Delete "${list.title}" List?`}
          extraInfo = {"All items within the list will also be deleted."} 
          pending = {pending}
        />
      )}
    
    </>

  )
}