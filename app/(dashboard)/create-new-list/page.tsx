"use client"

import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import {useRouter} from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

export default function CreateNewList() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [listTitle, setListTitle] = useState('');
  let router = useRouter();

  const handleListTitleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setListTitle(ev.target.value);
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/create-new-list', {
      method: "POST",
      body: JSON.stringify({"title": listTitle}),
      headers: {"Content-Type": "application/json"}
    })

    if(response.status === 201) {
      setMessage(response.statusText);
      const data = await response.json();
      router.push("/list/" + data.id + '/add-items');
    } else {
      setMessage(response.statusText);
      const error = await response.json();
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <main className="bg-gray-50 h-[90vh]">
      <section className="container px-10 py-10 mx-auto flex flex-col">
        <Link href={"/"}>
          <FiArrowLeft />
        </Link>
        <div className=" w-4/5 md:w-3/5 xl:w-2/5 mx-auto">
          <div className="p-3 md:p-5 lg:p-20 bg-white">

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label htmlFor="list-title" 
                className=" w-full flex flex-col px-3 gap-2">
                <span className="text-xl">
                  List Title
                </span>
                <input 
                  id="list-title" 
                  type="text" 
                  className=" bg-gray-100 px-4 py-2"
                  placeholder="Enter title for this list."
                  onChange={handleListTitleInput}
                  value={listTitle}
                />
              </label>
              <button 
                className= {loading ? "disabled-button-responsive" : "primary-button-responsive "}
                disabled={loading}
              > 
                {loading && <span>Loading...</span>}
                {!loading && <span>Submit</span>}
              </button>
              <div className="success-xl flex justify-end">
                {message}
              </div>
            </form>

          </div>
        </div>
        
      </section>
    </main>
  )
}
