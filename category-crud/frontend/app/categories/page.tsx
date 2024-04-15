"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [creating, setCreating] = useState(false);

  return (
    <div className="p-8 container mx-auto max-w-96">
      <button className="btn btn-primary mb-4" onClick={() => setCreating(true)}>
        New
      </button>

      <ListView />

      <CreateNewModal open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}

function ListView() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/categories").then(({ data }) => {
      setList(data);
    });
  }, []);

  return (
    <>
      {list.map((category: any) => (
        <div className="card bg-base-200 mb-4" key={category._id}>
          <div className="card-body">{category.name}</div>
        </div>
      ))}
    </>
  );
}

function CreateNewModal({ open, onClose }: any) {
  const [name, setName] = useState("");

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create new category</h3>
        <input placeholder="Name" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => onClose()}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
