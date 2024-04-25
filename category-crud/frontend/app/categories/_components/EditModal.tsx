"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageField } from "./ImageField";
import { useCategories } from "./utils";

export function EditModal({ editingId, onClose }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const loadCategories: any = useCategories((state: any) => state.loadCategories);

  useEffect(() => {
    reset();

    if (editingId) {
      axios.get(`http://localhost:4000/categories/${editingId}`).then(({ data }: any) => {
        setName(data.name);
        setDescription(data.description);
        setImage(data.image);
      });
    }
  }, [editingId]);

  function submit() {
    setLoading(true);
    axios
      .put(`http://localhost:4000/categories/${editingId}`, {
        name,
        description,
        image,
      })
      .then(() => {
        onClose();
        // reset();
        toast.success(`"${name}" category created updated.`);
        loadCategories();
      });
  }

  function reset() {
    setName("");
    setDescription("");
    setImage("");

    setLoading(false);
  }

  return (
    <dialog className={`modal ${editingId ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Create new category ({editingId})</h3>
        <input placeholder="Name" disabled={loading} className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input placeholder="Description" disabled={loading} className="input input-bordered" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <ImageField value={image} onChange={(value: string) => setImage(value)} />

        <div className="modal-action">
          <button className="btn" onClick={() => onClose()} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading && <span className="loading loading-spinner"></span>}
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
