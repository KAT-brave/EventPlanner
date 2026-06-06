"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { Event, Category } from "@/types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchEvents = async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (categoryId) params.set("category_id", categoryId);
    params.set("sort", sort);

    const res = await apiFetch(`/events?${params.toString()}`);
    const data = await res.json();
    setEvents(data);
    setIsLoading(false);
  };

  useEffect(() => {
    apiFetch("/categories").then((res) => res.json()).then(setCategories);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [sort, categoryId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">イベント一覧</h1>
        {user && (
          <Link
            href="/events/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            + イベントを作成
          </Link>
        )}
      </div>

      {/* 検索・絞り込みUI */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder="キーワードで検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            検索
          </button>
        </form>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">日付が近い順</option>
          <option value="desc">日付が遠い順</option>
        </select>
      </div>

      {/* イベント一覧 */}
      {isLoading ? (
        <p className="text-gray-500 text-center py-12">読み込み中...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500 text-center py-12">イベントが見つかりませんでした</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow"
            >
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {event.category.name}
              </span>
              <h2 className="font-bold text-gray-800 mt-2 mb-1 line-clamp-2">{event.title}</h2>
              <p className="text-sm text-gray-500">{event.event_date}</p>
              <p className="text-sm text-gray-500">{event.start_time}{event.end_time ? ` 〜 ${event.end_time}` : ""}</p>
              {event.location && (
                <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">作成者：{event.user.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
