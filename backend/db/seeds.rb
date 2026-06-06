categories = ["勉強会", "飲み会", "旅行", "スポーツ", "音楽・ライブ", "その他"]

categories.each do |name|
  Category.find_or_create_by!(name: name)
end

puts "カテゴリを#{Category.count}件登録しました"
