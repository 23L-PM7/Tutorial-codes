"use client";

import { useState } from "react";
import { mutator } from "../util";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const data = await mutator("login", { email, password });
    const { accessToken } = data;

    localStorage.setItem("accessToken", accessToken);
  }

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
