"use client"

import React, { ChangeEvent } from 'react'

export default function Checkbox({isChecked} : {isChecked: boolean}) {
  const handleChange = (e: ChangeEvent) => {
    console.log(e);
  }

  return (
    <div>
      <input 
        type="checkbox" 
        className=" w-4 h-4" 
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  )
}
