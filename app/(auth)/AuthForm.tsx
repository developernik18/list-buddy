"use client";

import { FormEvent, useState } from "react";

// css styles
import styles from "./AuthForm.module.css";
import { ButtonText } from "@/types/buttons";

export default function AuthForm({
  handleSubmit,
  buttonText
}: {
  handleSubmit(
    ev: FormEvent,
    email: string,
    password: string,
    setPending: (pending: boolean) => void
  ): void;
  buttonText: ButtonText
}) {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(ev) => handleSubmit(ev, email, password, setPending)}
      className={styles.form}
    >
      <label className={styles.label}>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          required
        />
      </label>
      <label className={styles.label}>
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          required
        />
      </label>
      <button 
        className={pending ? "disabled-button mt-5" :"primary-button mt-5"}
        disabled={pending}
      >
        {pending && <span>{buttonText.inProcess}</span>}
        {!pending && <span>{buttonText.default}</span>}
      </button>
    </form>
  );
}
