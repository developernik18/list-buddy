"use client"

import { FormEvent, useState } from "react";
import { selectUnitOptions } from "@/util/selection-list/for-unit";
import { selectCurrencyOptions } from "@/util/selection-list/for-currency";
import { List } from "@/types/list";
import { Item } from "@/types/item";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

function returnDate(expiry_date: Date | null) {
  console.log(expiry_date)
  if(expiry_date) {
    return String(expiry_date);
  }
  return '';
}

export default function ItemEditForm(
  {
    listDetails,
    itemDetails
  }: {
    listDetails: List,
    itemDetails: Item
  }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [itemName, setItemName] = useState(itemDetails.name);
  const [quantity, setQuantity] = useState(itemDetails.quantity);
  const [unit, setUnit] = useState(itemDetails.unit);
  const [currency, setCurrency] = useState(itemDetails.currency);
  const [price, setPrice] = useState(itemDetails.price);
  const [expiryDate, setExpiryDate] = useState(returnDate(itemDetails.expiry_date));
  const [notes, setNotes] = useState(itemDetails.notes);


  const handleFormSubmission = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');


    const res = await fetch( baseUrl + '/api/update-item', {
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
        list_id: listDetails.id,
        list_key: listDetails.list_key,
        id: itemDetails.id
      })
    })

    setLoading(false);
    if (res.status === 500) {
      setErrorMessage('Error while updating item');
    } else {
      let data = await res.json();
      setSuccessMessage('Item successfully updated.');
    }
  }


  return (
    <form
      onSubmit={(ev) => handleFormSubmission(ev)}
      className="body bg-white py-5 px-5 sm:px-10 md:px-14 min-h-full flex flex-col gap-5">
      <div className="row flex flex-col md:flex-row justify-between gap-10 md:gap-5">
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
        </label>
      </div>
      <div className="row flex flex-col md:flex-row justify-between gap-10 md:gap-5">
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
            value={currency}
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
      <div className="row flex flex-col md:flex-row items-stretch md:items-end justify-between gap-10 md:gap-5">
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
          {loading && <span>Updating...</span>}
          {!loading && <span>Update Item</span>}
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
          <a href={"/list/" + itemDetails.list_id} className=" text-primary-default">
            Open List
          </a>
        </div>
      )}
    </form>
  )
}
