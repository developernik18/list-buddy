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
      <h2
        className=" text-xl md:text-2xl 
          py-10 md:py-16 
          text-primary-default font-semibold"
      >
        Login
      </h2>

      <AuthForm handleSubmit={handleSubmit} buttonText={buttonText} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}
