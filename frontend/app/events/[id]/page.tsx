"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useFlash } from "@/context/FlashContext";
import type { Event } from "@/types/event";

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, token } = useAuth();
  const { showFlash } = useFlash();
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    apiFetch(`/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(setEvent)
      .catch(() => setError("イベントが見つかりませんでした"))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("このイベントを削除しますか？")) return;
    const res = await apiFetch(`/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showFlash("イベントを削除しました");
      router.push("/events");
    }
  };

  const isOwner = user && event && user.id === event.user.id;

  if (isLoading) return <p className="text-center py-12 text-gray-500">読み込み中...</p>;
  if (error) return <p className="text-center py-12 text-red-500">{error}</p>;
  if (!event) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/events" className="text-sm text-blue-600 hover:underline">
          ← イベント一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            {event.category.name}
          </span>
          {isOwner && (
            <div className="flex gap-2">
              <Link
                href={`/events/${id}/edit`}
                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
              >
                編集
              </Link>
              <button
                onClick={handleDelete}
                className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition-colors"
              >
                削除
              </button>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h1>

        <dl className="space-y-3 text-sm">
          <div className="flex gap-4">
            <dt className="text-gray-500 w-20 shrink-0">開催日</dt>
            <dd className="text-gray-800">{event.event_date}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="text-gray-500 w-20 shrink-0">時間</dt>
            <dd className="text-gray-800">
              {event.start_time}{event.end_time ? ` 〜 ${event.end_time}` : ""}
            </dd>
          </div>
          {event.location && (
            <div className="flex gap-4">
              <dt className="text-gray-500 w-20 shrink-0">場所</dt>
              <dd className="text-gray-800">{event.location}</dd>
            </div>
          )}
          <div className="flex gap-4">
            <dt className="text-gray-500 w-20 shrink-0">作成者</dt>
            <dd className="text-gray-800">{event.user.name}</dd>
          </div>
          {event.description && (
            <div className="pt-3 border-t border-gray-100">
              <dt className="text-gray-500 mb-2">説明</dt>
              <dd className="text-gray-800 whitespace-pre-wrap">{event.description}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
