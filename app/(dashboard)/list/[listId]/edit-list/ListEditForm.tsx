"use client"

import { List } from "@/types/list"
import { ChangeEvent, FormEvent, useState } from "react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ListEdit({list}: {list:List}) {
  const [listTitle, setListTitle] = useState(list.title);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleListTitleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setListTitle(ev.target.value);
  };

  const handleSubmit = async(ev: FormEvent) => {
    ev.preventDefault();

    if(listTitle.length < 3) {
      setError('Title should atleast have 2 characters.');
      return;
    }

    setPending(true);
    setError('');
    setSuccess('');

    const response = await fetch(baseUrl + "/api/update-list", {
      method: "PUT",
      body: JSON.stringify({ title: listTitle, id: list.id }),
      headers: { "Content-Type": "application/json" },
    });


    setPending(false);

  }


  return (
    <div className=" w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 mx-auto mt-5">
      <div className="bg-white shadow-white">
        <div className="card-header">
          Edit List
        </div>
        <div className="card-body py-5 px-5 md:p-10">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-7"
          >
            <label
              htmlFor="list-title"
              className=" w-full flex flex-col px-3 gap-4"
            >
              <span className="text-xl">Title</span>
              <input
                id="list-title"
                type="text"
                className=" bg-gray-100 px-4 py-2"
                placeholder="Enter title for this list."
                onChange={handleListTitleInput}
                value={listTitle}
                required
              />
            </label>
            <div className="flex flex-row justify-end w-full px-3">
              <button
                className={
                  pending
                    ? "disabled-button"
                    : "primary-button"
                }
                disabled={pending}
              >
                {pending && <span>Submitting...</span>}
                {!pending && <span>Submit</span>}
              </button>
            </div>

            {error && (
              <div className="error-xl flex justify-end">
                {error}
              </div>
            )}

            {success && (
              <div className="success-xl flex justify-end">
                {success}
              </div>
            )}


          </form>
        </div>
      </div>
    </div>
  )
}