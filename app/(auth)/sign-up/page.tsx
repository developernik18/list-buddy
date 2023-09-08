"use client"

import { FormEvent, useState } from "react";
import AuthForm from "../AuthForm";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from "next/navigation"

export default function SignUp() {
  const [error, setError] = useState('');
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (ev: FormEvent, email: string, password: string) => {
    ev.preventDefault();

    const {error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if(error) {
      setError(error.message);
    }

    if(!error) {
      router.push('/verify');
    }
    console.log('Sign Up', email, password);
  }

  return (
    <main className="flex flex-col items-center bg-gray-100 pb-48">
      <h2 className=" text-2xl py-16 text-primary-default font-semibold">
        Sign Up
      </h2>

      <AuthForm handleSubmit= {handleSubmit} />
      {error && (
        <div className="error">
          {error}
        </div>
      )}
    </main>
  )
}
