import { useState } from "react";

export function ImageField({ value, onChange }: any) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: any) {
    setUploading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("upload_preset", "xnhpft2k");
    formData.append("cloud_name", "deyylvaoy");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/deyylvaoy/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { secure_url } = await res.json();
        onChange(secure_url);
        setUploading(false);
      }
    } catch (e) {
      alert("An Error Occured While Uploading");
    }
  }

  return (
    <div>
      <input type="file" name="file" disabled={uploading} onChange={handleUpload} />

      {value && <img src={value} />}
    </div>
  );
}
