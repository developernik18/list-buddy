"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function CreateNewList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [listTitle, setListTitle] = useState("");
  let router = useRouter();

  const handleListTitleInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setListTitle(ev.target.value);
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if(listTitle.length < 3) {
      setError('Title should atleast have 2 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const response = await fetch(baseUrl + "/api/create-new-list", {
      method: "POST",
      body: JSON.stringify({ title: listTitle }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      setSuccess(response.statusText);
      const data = await response.json();
      router.push("/list/" + data.id + "/add-items");
    } else {
      setError(response.statusText);
      const error = await response.json();
      // console.log(error);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-row justify-center items-center">
      <section className="container px-5 sm:px-10 py-10 mx-auto flex flex-col">
        <Link href={"/"}>
          <FiArrowLeft />
        </Link>
        <div className=" w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 mx-auto mt-5">
          <div className="bg-white shadow-white">
            <div className="card-header">
              Create New List
            </div>
            <div className="card-body py-5 px-5 md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <label
                  htmlFor="list-title"
                  className=" w-full flex flex-col px-3 gap-4"
                >
                  <span className="text-xl">List Title</span>
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
                      loading
                        ? "disabled-button"
                        : "primary-button"
                    }
                    disabled={loading}
                  >
                    {loading && <span>Submitting...</span>}
                    {!loading && <span>Submit</span>}
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
      </section>
    </main>
  );
}
