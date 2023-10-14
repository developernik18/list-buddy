"use client";
import { useState } from "react";
import Styles from './AddItem.module.css';

import { selectUnitOptions } from "@/util/selection-list/for-unit";

export default function AddItem() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(selectUnitOptions[0].value);

  return (
    <form className="flex flex-col gap-3">
      <div className="relative">
        <input 
          type="text" 
          id="floatingOutlinedInput" 
          className={Styles.floatingOutlinedInput+ " peer"} 
          placeholder=" " 
        />
        <label 
          htmlFor="floatingOutlinedInput" 
          className=
            {
              Styles.floatingOutlinedLabel + 
              " peer-focus:px-2 peer-focus:dark:text-blue-500 " + 
              "peer-placeholder-shown:scale-100 " + 
              "peer-placeholder-shown:-translate-y-1/2 " +
              "peer-placeholder-shown:top-1/2 peer-focus:top-2 " + 
              "peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            }>
              Floating outlined
          </label>
      </div>
      
      <div className="input-area relative">
      


        <label htmlFor="item-name" className="bg-gray-50 w-fit absolute left-2 -top-3">
            Item Name
        </label>
        <div className="border-2">
          <input 
            type="text" 
            id="item-name"
            className="bg-gray-50 px-4 py-2 w-full" 
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}  
            placeholder="Item Name"
          />
        </div>

      </div>
      
      <div className="field relative border-2">
        <input 
          type="number" 
          min={0}
          id="item-quantity" 
          className="bg-white px-4 py-2 w-full outline-offset-1 "
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


      </div>

    </form>
  )
}