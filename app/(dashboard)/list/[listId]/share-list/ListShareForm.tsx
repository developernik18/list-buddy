"use client"

import "./ListShareForm.css";
import { List } from "@/types/list"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ListShareForm({list}: {list:List}) {
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleEmailInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.target.value);
  }

  const handleSubmit = async (ev: FormEvent) => {

  }


  return (
    <div className=" w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 mx-auto mt-5">
      <div className="bg-white shadow-white">
        <div className="card-header">
          {list.title} List
        </div>
        <div className="card-body py-5 px-5 md:p-10">
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col gap-7"
          >
            <label
              className=" w-full flex flex-col px-3 gap-4"
            >
              <span className="text-xl">
                Share with
              </span>
              <input
                type="email"
                name="email"
                className=" bg-gray-100 px-4 py-2"
                placeholder="Enter email to share your list"
                value={email}
                onChange={handleEmailInput}
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

          {list.share_with && (
            <>
              
              <hr className="my-5 md:my-10"/>
              <div className="shared-with-list-container">
                <span className="title">
                  List Shared with:                   
                </span>
                <div className="shared-with-list">
                  {list.share_with.map(listedEmail => {
                    return (
                      <div key={listedEmail} className="email-container">
                        {listedEmail}
                      </div>
                    )
                  })}
                </div>
                
              </div>
            </>
            
          )}

        </div>
      </div>
    </div>
  )
}