"use client";

import { useState } from "react";
import { ImageField } from "./categories/_components/ImageField";

export default function Home() {
  const [image, setImage] = useState("");

  return (
    <div>
      <ImageField value={image} onChange={setImage} />
    </div>
  );
}
