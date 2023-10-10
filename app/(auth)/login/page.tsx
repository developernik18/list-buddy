"use client";

import { FormEvent, useState } from "react";
import AuthForm from "../AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ButtonText } from "@/types/buttons";

const buttonText: ButtonText = {
  default: 'Log In',
  inProcess: 'Logging In...'
}

export default function SignUp() {
  const [error, setError] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (
    ev: FormEvent,
    email: string,
    password: string,
    setPending: (pending: boolean) => void
  ) => {
    ev.preventDefault();
    setPending(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    if (!error) {
      router.push("/");
    }
    setPending(false);
  };

  return (
    <main className="flex flex-col items-center h-full">
      <div className="form-area bg-white my-10 md:my-16 p-5 shadow-md">
        <h2
          className=" text-xl md:text-2xl  
            text-primary-default font-semibold text-center"
        >
          Login
        </h2>

        <AuthForm 
          handleSubmit={handleSubmit} 
          buttonText={buttonText} 
        />
      </div>
      

      
      {error && <div className="error">{error}</div>}
    </main>
  );
}
