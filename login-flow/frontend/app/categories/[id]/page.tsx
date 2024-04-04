"use client";

export default function Home({ params }: { params: { id: string } }) {
  return <div>hi, {params.id}</div>;
}
