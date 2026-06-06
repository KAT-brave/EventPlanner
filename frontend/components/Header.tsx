import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold hover:opacity-80">
        EventPlanner
      </Link>
      <nav className="flex gap-4 text-sm">
        <Link href="/events" className="hover:opacity-80">
          イベント一覧
        </Link>
        <Link href="/login" className="hover:opacity-80">
          ログイン
        </Link>
        <Link href="/signup" className="hover:opacity-80">
          新規登録
        </Link>
      </nav>
    </header>
  );
}
