import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">EventPlanner</h1>
      <p className="text-lg text-gray-500 mb-8">
        イベント予定を登録・管理できるWebアプリです。
      </p>
      <div className="flex gap-4">
        <Link
          href="/events"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          イベント一覧を見る
        </Link>
        <Link
          href="/signup"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          新規登録
        </Link>
      </div>
    </div>
  );
}
