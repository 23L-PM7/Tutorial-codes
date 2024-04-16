"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditModal } from "./EditModal";
import { useCategories } from "./utils";

export function ListView() {
  const { categories, setCategories }: any = useCategories();
  const [editingId, setEditingId] = useState("");

  function loadList() {
    axios.get("http://localhost:4000/categories").then(({ data }) => {
      setCategories(data);
    });
  }

  useEffect(() => {
    loadList();
  }, []);

  function removeCategory(id: string) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:4000/categories/${id}`).then(() => {
        toast.success(`Category deleted.`);
        loadList();
      });
    }
  }

  return (
    <>
      {categories.map((category: any) => (
        <div className="card bg-base-200 mb-4" key={category._id}>
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">{category.name}</div>
              <button className="btn btn-error btn-outline" onClick={() => removeCategory(category._id)}>
                Delete
              </button>
              <button className="btn btn-neutral btn-outline ml-2" onClick={() => setEditingId(category._id)}>
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}

      <EditModal editingId={editingId} onClose={() => setEditingId("")} />
    </>
  );
}
