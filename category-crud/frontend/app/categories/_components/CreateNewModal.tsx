"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useCategories } from "./utils";

export function CreateNewModal({ open, onClose }: any) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const loadCategories: any = useCategories((state: any) => state.loadCategories);

  function submit() {
    setLoading(true);
    axios.post("http://localhost:4000/categories", { name }).then(() => {
      onClose();
      reset();
      toast.success(`"${name}" category created successfully.`);
      loadCategories();
    });
  }

  function reset() {
    setLoading(false);
    setName("");
  }

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create new category</h3>
        <input placeholder="Name" disabled={loading} className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="modal-action">
          <button className="btn" onClick={() => onClose()} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading && <span className="loading loading-spinner"></span>}
            Create
          </button>
        </div>
      </div>
    </dialog>
  );
}
