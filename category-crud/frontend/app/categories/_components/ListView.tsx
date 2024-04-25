"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditModal } from "./EditModal";
import { useCategories } from "./utils";

export function ListView() {
  const { categories, loadCategories }: any = useCategories();
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  function removeCategory(id: string) {
    if (confirm("Delete?")) {
      axios.delete(`http://localhost:4000/categories/${id}`).then(() => {
        toast.success(`Category deleted.`);
        loadCategories();
      });
    }
  }

  if (categories === null) {
    return (
      <div className="text-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (categories.length === 0) {
    return <div className="text-center py-8 text-3xl text-gray-500">Хоосон байна</div>;
  }

  return (
    <>
      {categories.map((category: any) => (
        <div className="card bg-base-200 mb-4" key={category._id}>
          <div className="card-body">
            <img src={category.image} />
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
