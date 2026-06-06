"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useFlash } from "@/context/FlashContext";
import EventForm, { type EventFormData } from "@/components/EventForm";

export default function NewEventPage() {
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { showFlash } = useFlash();
  const router = useRouter();

  const handleSubmit = async (data: EventFormData) => {
    setErrors([]);
    setIsLoading(true);
    try {
      const res = await apiFetch("/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        showFlash("イベントを作成しました");
        router.push(`/events/${json.id}`);
      } else {
        setErrors(json.errors || ["作成に失敗しました"]);
      }
    } catch {
      setErrors(["通信エラーが発生しました"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/events" className="text-sm text-blue-600 hover:underline">
          ← イベント一覧に戻る
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">イベントを作成</h1>
        <EventForm
          onSubmit={handleSubmit}
          submitLabel="作成する"
          isLoading={isLoading}
          errors={errors}
        />
      </div>
    </div>
  );
}
