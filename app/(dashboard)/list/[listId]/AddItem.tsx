"use client";
import { useState } from "react";
import Styles from './AddItem.module.css';
import { FormEvent } from "react";

import { selectUnitOptions } from "@/util/selection-list/for-unit";
import { selectCurrencyOptions } from "@/util/selection-list/for-currency";
import { ListWithoutOrigin } from "@/types/list";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function AddItem({list} : {list: ListWithoutOrigin}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(selectUnitOptions[0].value);

  const resetAllInputField = () => {
    setItemName('');
    setQuantity(0);
    setUnit(selectUnitOptions[0].value);
  }

  const handleFormSubmission = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const res = await fetch(baseUrl + '/api/add-item', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: itemName,
        quantity,
        unit,
        currency: selectCurrencyOptions[0].value,
        price: 0,
        expiry_date: null,
        notes: "",
        list_id: list.id,
        list_key: list.list_key
      })
    })

    
    setLoading(false);
    if(res.status === 500) {
      setErrorMessage('Error while adding items');
    } else {
      let data = await res.json();
      resetAllInputField();
      setSuccessMessage('Item successfully added.');  
    }


  }

  return (
    <div className="modal fixed w-screen h-screen bg-black top-0 left-0 flex justify-center items-center">
      <div 
        className="absolute text-white right-10 top-6 text-xl cursor-pointer">
        X
      </div>
      
      <form 
        className="flex flex-col gap-3 p-5 md:p-10 bg-white"
        onSubmit={(ev) => handleFormSubmission(ev)}
      >
        <h2 className="text-lg text-primary-default font-medium text-center mb-3">
          Add Item
        </h2>
        <div className="relative">
          <input 
            type="text" 
            id="floatingOutlinedInput" 
            className={Styles.floatingOutlinedInput+ " peer"} 
            placeholder=" " 
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}  
          />
          <label 
            htmlFor="floatingOutlinedInput" 
            className=
              {
                Styles.floatingOutlinedLabel + " peer-focus:text-primary-default" +
                " peer-focus:px-2 peer-focus:dark:text-blue-500 " + 
                "peer-placeholder-shown:scale-100 " + 
                "peer-placeholder-shown:-translate-y-1/2 " +
                "peer-placeholder-shown:top-1/2 peer-focus:top-2 " + 
                "peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              }>
                Item Name
            </label>
        </div>

        <div className="relative">
          <input 
              type="number" 
              min={0}
              id="item-quantity" 
              className={Styles.floatingOutlinedInput+ " peer"} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              value={quantity}
            />
          <label 
            htmlFor="floatingOutlinedInput" 
            className=
              {
                Styles.floatingOutlinedLabel + " peer-focus:text-primary-default" +
                " peer-focus:px-2 peer-focus:dark:text-blue-500 " + 
                "peer-placeholder-shown:scale-100 " + 
                "peer-placeholder-shown:-translate-y-1/2 " +
                "peer-placeholder-shown:top-1/2 peer-focus:top-2 " + 
                "peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              }>
                Quantity
            </label>

          <select 
            name="unit" 
            id="quantity-unit" 
            onChange={(e) => setUnit(e.target.value)}
            className="absolute right-0 bottom-0 px-4 py-3 bg-gray-200"
            value={unit}
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
      
        <button 
          className={loading? "disabled-button" : "primary-button"} 
          disabled={loading}
        >
          {loading && <span>Adding...</span> } 
          {!loading && <span>Add to List</span> } 
        </button>

        
        {errorMessage && (
          <div className="error-xl text-right">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="success-xl text-right">
            {successMessage + " "}
            <a href={"/list/" + list.id} className=" text-primary-default">
              Open List
            </a>
          </div>
        )}
      </form>
    </div>

  )
}