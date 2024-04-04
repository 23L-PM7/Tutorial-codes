"use client";

import { useState } from "react";

// 1. email oruulah, 2. opt, 3. new pass

export default function Home() {
  const [step, setStep] = useState("EMAIL"); // EMAIL, OTP, PASSWORD

  function submit() {
    // TODO
    alert("Successfully changed password");
  }

  switch (step) {
    case "EMAIL":
      return (
        <div>
          EMAIL <button onClick={() => setStep("OTP")}>Continue</button>
        </div>
      );
    case "OTP":
      return (
        <div>
          OTP <button onClick={() => setStep("PASSWORD")}>Continue</button>
        </div>
      );
    case "PASSWORD":
      return (
        <div>
          PASS
          <button onClick={submit}>Submit</button>
        </div>
      );
    default:
      return null;
  }
}
