"use client"

import { FiTrash } from "react-icons/fi"

export default function Delete() {

  const handleDelete = async () => {
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