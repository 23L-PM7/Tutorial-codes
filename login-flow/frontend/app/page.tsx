"use client";

import { ReactNode, useState } from "react";
import { mutator } from "./util";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitSignup() {
    await mutator("sign-up", { email, password });
    closeSignup();
    alert("Success Sign-up. Now Login.");
  }

  function closeSignup() {
    setSignupOpen(false);
    setEmail("");
    setPassword("");
  }
  return (
    <div>
      <button type="button" className="btn" onClick={() => setLoginOpen(true)}>
        Login
      </button>

      <button className="btn" onClick={() => setSignupOpen(true)}>
        Sign Up
      </button>

      <Modal open={loginOpen} onClose={closeSignup}>
        <h3 className="font-bold text-lg">Hello!1</h3>
        <p className="py-4">LOGIN1</p>
      </Modal>

      <Modal open={signupOpen} onClose={closeSignup}>
        <div className="flex flex-col gap-4">
          <input className="input input-bordered" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input input-bordered" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="btn btn-primary" onClick={submitSignup}>
            Sign Up
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Modal({ children, open, onClose }: { children: ReactNode; open: Boolean; onClose: () => void }) {
  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <button className="btn" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
