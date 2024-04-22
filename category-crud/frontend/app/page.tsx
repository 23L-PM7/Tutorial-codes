"use client";

import { useState } from "react";

export default function Home() {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: any) {
    setUploading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      console.log({ data });
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="file" name="file" disabled={uploading} onChange={handleUpload} />
    </div>
  );
}
