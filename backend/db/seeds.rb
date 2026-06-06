categories = ["勉強会", "飲み会", "旅行", "スポーツ", "音楽・ライブ", "その他"]

categories.each do |name|
  Category.find_or_create_by!(name: name)
end

puts "カテゴリを#{Category.count}件登録しました"

guest = User.find_or_create_by!(email: "guest@example.com") do |u|
  u.name = "ゲストユーザー"
  u.password = SecureRandom.urlsafe_base64
  u.guest = true
end

User.find_or_create_by!(email: "test@example.com") do |u|
  u.name = "テストユーザー"
  u.password = "password123"
end

study   = Category.find_by!(name: "勉強会")
nomikai = Category.find_by!(name: "飲み会")
travel  = Category.find_by!(name: "旅行")
sports  = Category.find_by!(name: "スポーツ")
music   = Category.find_by!(name: "音楽・ライブ")

events = [
  {
    title: "Rails勉強会",
    description: "Ruby on Railsの基礎から応用まで学ぶ勉強会です。初心者歓迎！",
    event_date: Date.today + 3,
    start_time: "14:00",
    end_time: "17:00",
    location: "東京・渋谷",
    category: study
  },
  {
    title: "React入門ハンズオン",
    description: "Reactの基本的な使い方をハンズオン形式で学びます。",
    event_date: Date.today + 7,
    start_time: "10:00",
    end_time: "12:00",
    location: "オンライン",
    category: study
  },
  {
    title: "チーム懇親会",
    description: "新メンバーを迎えての懇親会です。気軽にご参加ください。",
    event_date: Date.today + 5,
    start_time: "19:00",
    end_time: "21:00",
    location: "大阪・梅田",
    category: nomikai
  },
  {
    title: "京都日帰り旅行",
    description: "紅葉シーズンの京都を楽しむ日帰り旅行です。",
    event_date: Date.today + 14,
    start_time: "08:00",
    end_time: "20:00",
    location: "京都",
    category: travel
  },
  {
    title: "フットサル大会",
    description: "社内フットサル大会を開催します。チームで参加しましょう！",
    event_date: Date.today + 10,
    start_time: "13:00",
    end_time: "17:00",
    location: "東京・江東区",
    category: sports
  },
  {
    title: "ライブコンサート鑑賞",
    description: "人気バンドのライブに一緒に行きましょう。",
    event_date: Date.today + 20,
    start_time: "18:00",
    end_time: "21:00",
    location: "東京・武道館",
    category: music
  }
]

events.each do |attrs|
  Event.find_or_create_by!(title: attrs[:title], user: guest) do |e|
    e.assign_attributes(attrs)
  end
end

puts "イベントを#{Event.count}件登録しました"
