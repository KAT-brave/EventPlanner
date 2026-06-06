"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Category } from "@/types/event";

export type EventFormData = {
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  category_id: string;
};

type Props = {
  initialData?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => Promise<void>;
  submitLabel: string;
  isLoading: boolean;
  errors: string[];
};

export default function EventForm({ initialData, onSubmit, submitLabel, isLoading, errors }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<EventFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    event_date: initialData?.event_date ?? "",
    start_time: initialData?.start_time ?? "",
    end_time: initialData?.end_time ?? "",
    location: initialData?.location ?? "",
    category_id: initialData?.category_id ?? "",
  });

  useEffect(() => {
    apiFetch("/categories").then((res) => res.json()).then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <ul className="bg-red-50 text-red-600 text-sm p-3 rounded space-y-1">
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">イベント名 *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ *</label>
        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">選択してください</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">開催日 *</label>
          <input
            type="date"
            name="event_date"
            value={form.event_date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">開始時間 *</label>
          <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">終了時間</label>
          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? "処理中..." : submitLabel}
      </button>
    </form>
  );
}
