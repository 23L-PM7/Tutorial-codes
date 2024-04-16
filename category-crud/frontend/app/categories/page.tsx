"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { CreateNewModal } from "./_components/CreateNewModal";
import { ListView } from "./_components/ListView";

export default function Page() {
  const [creating, setCreating] = useState(false);

  return (
    <div className="p-8 container mx-auto max-w-lg">
      <button className="btn btn-primary mb-4" onClick={() => setCreating(true)}>
        New
      </button>

      <ListView />

      <Toaster position="top-right" richColors />

      <CreateNewModal open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}
