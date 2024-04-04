"use client";

import { useEffect, useState } from "react";
import { fetcher } from "./util";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    fetcher("foods").then((data) => {
      console.log(data);
    });
  }, []);

  if (loggedIn) {
    return <MainApp />;
  }

  return <Login />;
}
