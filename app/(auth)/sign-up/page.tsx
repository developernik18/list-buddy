"use client"
// Form Event is used to accept event generated on submit of the form
// usestate is used to display errors
import { FormEvent, useState } from "react"; 

// AuthForm is a component that contains the form.
import AuthForm from "../AuthForm";

// createClientComponentClient is used to create supabase client
// and this supabase client sends the form fields to supabase server
// to sign up the user.
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


// useRouter is used to create router which is used to redirect the 
// user to the verify page.
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
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if(error) {
      setError(error.message);
    }

    if(!error) {
      router.push('/verify');
    }
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
