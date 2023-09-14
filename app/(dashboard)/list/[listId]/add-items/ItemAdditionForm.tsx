"use client"

import { FormEvent, useState } from "react";
import { selectUnitOptions } from "@/util/selection-list/for-unit";
import { selectCurrencyOptions } from "@/util/selection-list/for-currency";

export default function ItemAdditionForm() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(selectUnitOptions[0].value);
  const [currency, setCurrency] = useState(selectCurrencyOptions[0].value);
  const [price, setPrice] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');


  const handleFormSubmission = (ev: FormEvent) => {
    ev.preventDefault();
    console.log(itemName, quantity, unit, currency, price, expiryDate, notes)
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
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}  
          />
        </label>
        <label className="relative flex flex-col gap-4 basis-2/5">
          Quantity
          <input 
            type="number" 
            min={0}
            id="item-quantity" 
            className="bg-gray-100 px-4 py-2 w-full outline-offset-1"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
          />
          <select 
            name="unit" 
            id="quantity-unit" 
            onChange={(e) => setUnit(e.target.value)}
            className="absolute right-0 bottom-0 px-4 py-2 bg-gray-200"
          >
            {selectUnitOptions.map(option => {
              return (
                <option 
                  value={option.value} 
                  key={option.label}  
                >
                  {option.label}
                </option>
              )
            })}
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
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="bg-gray-100 px-4 pl-20 py-2 w-full outline-offset-2" 
          />
          <select 
            name="currency" 
            id="currency" 
            className="absolute left-0 bottom-1 px-4 py-2 bg-gray-200"
            onChange={(e) => setCurrency(e.target.value)}
          >
            {selectCurrencyOptions.map(option => {
              return (
                <option 
                  value={option.value} 
                  key={option.label}  
                >
                  {option.label}
                </option>
              )
            })}
          </select>
        </label>
        <label className="flex flex-col gap-4 basis-2/5">
          Expiry Date
          <input 
            type="date" 
            id="expiry-date"
            className="bg-gray-100 px-4 py-2 w-full"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)} 
          />
        </label>
        
      </div>
      <div className="row flex flex-col md:flex-row items-end justify-between">
        <label htmlFor="notes" className="flex flex-col gap-4 basis-2/5">
          Notes:
          <textarea
            id="notes"
            className="bg-gray-100 px-4 py-2 w-full" 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
              
          />
        </label>
        <button className="primary-button">
          Add to List
        </button>
      </div>
    </form>
  )
}
