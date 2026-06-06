"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        router.push("/events");
      } else {
        setError(data.error || "ログインに失敗しました");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await apiFetch("/auth/guest_login", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        router.push("/events");
      }
    } catch {
      setError("通信エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">ログイン</h1>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "処理中..." : "ログイン"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm"
          >
            ゲストとしてログイン
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          アカウントをお持ちでない方は{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            新規登録
          </Link>
        </p>
      </div>
    </div>
  );
}
