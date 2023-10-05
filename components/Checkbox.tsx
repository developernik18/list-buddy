"use client"

import React, { ChangeEvent, useState } from 'react'

type Item = {
  "id": number,
  "list_id": number,
  "list_key": string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function Checkbox(
  {
    isChecked,
    item
  }: {
    isChecked: boolean,
    item: Item
  }) {

  const [checked, setChecked] = useState(isChecked);
  
  const handleChange = async (e: ChangeEvent) => {
    const response = await fetch(baseUrl + '/api/update-item-purchased', {
      method: "PUT",
      headers: { "Content-Type": "appplication/json" },
      body: JSON.stringify({
        "purchased": !checked,
        "list_id": item.list_id,
        "list_key": item.list_key,
        "id": item.id
      })
    })

    const data = await response.json();

    if(data.id) {
      setChecked(data.purchased);
    }

  }

  return (
    <div>
      <input
        type="checkbox"
        className=" w-4 h-4"
        checked={checked}
        onChange={handleChange}
      />
    </div>
  )
}
