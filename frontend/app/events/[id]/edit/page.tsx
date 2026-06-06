"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useFlash } from "@/context/FlashContext";
import EventForm, { type EventFormData } from "@/components/EventForm";
import type { Event } from "@/types/event";

export default function EditEventPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user } = useAuth();
  const { showFlash } = useFlash();
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    apiFetch(`/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (user && data.user.id !== user.id) {
          router.push(`/events/${id}`);
        }
        setEvent(data);
      });
  }, [id, user]);

  const handleSubmit = async (data: EventFormData) => {
    setErrors([]);
    setIsLoading(true);
    try {
      const res = await apiFetch(`/events/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        showFlash("イベントを更新しました");
        router.push(`/events/${id}`);
      } else {
        setErrors(json.errors || ["更新に失敗しました"]);
      }
    } catch {
      setErrors(["通信エラーが発生しました"]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) return <p className="text-center py-12 text-gray-500">読み込み中...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href={`/events/${id}`} className="text-sm text-blue-600 hover:underline">
          ← 詳細に戻る
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">イベントを編集</h1>
        <EventForm
          initialData={{
            title: event.title,
            description: event.description ?? "",
            event_date: event.event_date,
            start_time: event.start_time,
            end_time: event.end_time ?? "",
            location: event.location ?? "",
            category_id: String(event.category.id),
          }}
          onSubmit={handleSubmit}
          submitLabel="更新する"
          isLoading={isLoading}
          errors={errors}
        />
      </div>
    </div>
  );
}
