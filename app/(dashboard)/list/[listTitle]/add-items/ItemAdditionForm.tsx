"use client"

import { FormEvent } from "react"

export default function ItemAdditionForm() {

  const handleFormSubmission = (ev: FormEvent) => {
    ev.preventDefault();
    // router.push("/list/" + params.listTitle);
  }


  return (
    <form 
      onSubmit={(ev) => handleFormSubmission(ev)}
      className="body bg-white py-5 px-14 min-h-full flex flex-col gap-5">
      <div className="row flex flex-col md:flex-row justify-between">
        <label className="flex flex-col gap-4 basis-2/5">
          Item Name
          <input 
            type="text" 
            id="item-name"
            className="bg-gray-100 px-4 py-2 w-full"   
          />
        </label>
        <label className="relative flex flex-col gap-4 basis-2/5">
          Quantity
          <input 
            type="text" 
            id="item-quantity" 
            className="bg-gray-100 px-4 py-2 w-full outline-offset-1" 
          />
          <select 
            name="unit" 
            id="quantity-unit" 
            className="absolute right-0 bottom-0 px-4 py-2 bg-gray-200"
          >
            <option value="kg">kg</option>
            <option value="gram">gram</option>
            <option value="litre">litre</option>
            <option value="piece">piece</option>
          </select>
        </label>
      </div>
      <div className="row flex flex-col md:flex-row justify-between">
        <label className="relative flex flex-col gap-4 basis-2/5">
          Price
          <input 
            type="number" 
            id="item-price" 
            min={0}
            className="bg-gray-100 px-4 pl-20 py-2 w-full outline-offset-2" 
          />
          <select 
            name="currency" 
            id="currency" 
            className="absolute left-0 bottom-1 px-4 py-2 bg-gray-200"
          >
            <option value="INR">₹</option>
            <option value="pound">£</option>
            <option value="dollar">$</option>
          </select>
        </label>
        <label className="flex flex-col gap-4 basis-2/5">
          Expiry Date
          <input 
            type="date" 
            id="expiry-date"
            className="bg-gray-100 px-4 py-2 w-full"   
          />
        </label>
        
      </div>
      <div className="row flex flex-col md:flex-row items-end justify-between">
        <label htmlFor="notes" className="flex flex-col gap-4 basis-2/5">
          Notes:
          <textarea
            id="notes"
            className="bg-gray-100 px-4 py-2 w-full"   
          />
        </label>
        <button className="primary-button">
          Add to List
        </button>
      </div>
    </form>
  )
}
