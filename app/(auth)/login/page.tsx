"use client"

import { FormEvent } from "react";
import AuthForm from "../AuthForm";


export default function SignUp() {

  const handleSubmit = (ev: FormEvent, email: string, password: string) => {
    ev.preventDefault();
    console.log('Login', email, password);
  }

  return (
    <main className="flex flex-col items-center bg-gray-100 pb-48">
      <h2 className=" text-2xl py-16 text-primary-default font-semibold">
        Login
      </h2>

      <AuthForm handleSubmit= {handleSubmit} />
    </main>
  )
}
