"use client";

import { useFlash } from "@/context/FlashContext";

export default function FlashMessage() {
  const { flash } = useFlash();

  if (!flash) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg shadow-lg text-white text-sm transition-opacity ${
        flash.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {flash.message}
    </div>
  );
}
