"use client";

import axios from "axios";
import { useEffect } from "react";
import { useCategories } from "./utils";

export function ListView() {
  const { categories, setCategories }: any = useCategories();

  function loadList() {
    axios.get("http://localhost:4000/categories").then(({ data }) => {
      setCategories(data);
    });
  }

  useEffect(() => {
    loadList();
  }, []);

  return (
    <>
      {categories.map((category: any) => (
        <div className="card bg-base-200 mb-4" key={category._id}>
          <div className="card-body">{category.name}</div>
        </div>
      ))}
    </>
  );
}
