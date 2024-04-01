"use client";

import { useEffect, useState } from "react";
import { fetcher } from "./util";

export default function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetcher("foods").then((data) => {
      console.log(data);
    });
  }, []);

  return <div></div>;
}
