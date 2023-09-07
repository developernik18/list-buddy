"use client"

import { FormEvent, useState } from "react"
import styles from './AuthForm.module.css'


export default function AuthForm({ handleSubmit} : {handleSubmit(ev: FormEvent, email: string, password: string): void}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <form 
      onSubmit={(ev) => handleSubmit(ev, email, password)}
      className={styles.form}  
    >
      <label className={styles.label}>
        <span>
          Email:
        </span>
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label className={styles.label}>
        <span>Password</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      <button className="primary-button mt-5">
        Submit
      </button>
    </form>
  )
}
