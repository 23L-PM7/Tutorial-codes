"use client";

import { ReactNode, useState } from "react";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <div>
      <button type="button" className="btn" onClick={() => setLoginOpen(true)}>
        Login
      </button>

      <button className="btn" onClick={() => setSignupOpen(true)}>
        Sign Up
      </button>

      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <h3 className="font-bold text-lg">Hello!1</h3>
        <p className="py-4">LOGIN1</p>
      </Modal>

      <Modal open={signupOpen} onClose={() => setSignupOpen(false)}>
        <p className="py-4">SIGN UP</p>
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
