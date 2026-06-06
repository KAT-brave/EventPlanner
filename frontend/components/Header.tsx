"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold hover:opacity-80">
        EventPlanner
      </Link>
      <nav className="flex gap-4 text-sm items-center">
        <Link href="/events" className="hover:opacity-80">
          イベント一覧
        </Link>
        {!isLoading && (
          <>
            {user ? (
              <>
                <span className="opacity-80">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="hover:opacity-80 cursor-pointer"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:opacity-80">
                  ログイン
                </Link>
                <Link href="/signup" className="hover:opacity-80">
                  新規登録
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
