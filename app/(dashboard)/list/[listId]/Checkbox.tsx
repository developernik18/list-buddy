"use client"

import React, { ChangeEvent, useState } from 'react'

type Item = {
  "id": number,
  "list_id": number,
  "list_key": string
}

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
    const response = await fetch('http://localhost:3000/api/update-item', {
      method: "POST",
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
