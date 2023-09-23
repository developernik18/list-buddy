"use client"

import { FormEvent, useState } from "react";
import { selectUnitOptions } from "@/util/selection-list/for-unit";
import { selectCurrencyOptions } from "@/util/selection-list/for-currency";
import Link from "next/link";
import { List } from "@/types/list";

export default function ItemEditForm(
  {
    listDetails,
    itemId
  }: {
    listDetails: List,
    itemId: number
  }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState(selectUnitOptions[0].value);
  const [currency, setCurrency] = useState(selectCurrencyOptions[0].value);
  const [price, setPrice] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');

  const resetAllInputField = () => {
    setItemName('');
    setQuantity(0);
    setUnit(selectUnitOptions[0].value);
    setCurrency(selectCurrencyOptions[0].value);
    setPrice(0);
    setExpiryDate('');
    setNotes('');
  }

  const handleFormSubmission = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');


    const res = await fetch('http://localhost:3000/api/add-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: itemName,
        quantity,
        unit,
        currency,
        price,
        expiry_date: expiryDate ? expiryDate : null,
        notes,
        list_id: listId,
        list_key: listKey
      })
    })

    setLoading(false);
    if (res.status === 500) {
      setErrorMessage('Error while adding items');
    } else {
      let data = await res.json();
      resetAllInputField();
      setSuccessMessage('Item successfully added.');
    }
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
            step={"any"}
            value={price}
            onChange={(e) => {
              let price = Number(e.target.value).toFixed(2);
              setPrice(Number(price))
            }}
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
        <button
          className={loading ? "disabled-button" : "primary-button"}
          disabled={loading}
        >
          {loading && <span>Loading...</span>}
          {!loading && <span>Add to List</span>}
        </button>
      </div>

      {errorMessage && (
        <div className="error-xl text-right">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-xl text-right">
          {successMessage + " "}
          <Link href={"/list/" + listId} className=" text-primary-default">
            Open List
          </Link>
        </div>
      )}
    </form>
  )
}
