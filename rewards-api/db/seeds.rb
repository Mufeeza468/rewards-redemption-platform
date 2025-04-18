# Create 5 users with random points
5.times do |i|
  User.create!(
    name: "User #{i + 1}",
    points: rand(200..1000)
  )
end

# Create 50 sample rewards
50.times do |i|
  Reward.create!(
    title: "Reward ##{i + 1}",
    description: "This is a description for reward ##{i + 1}",
    cost: rand(20..150)
  )
end

puts "Seeded 1 user with 1000 points and 50 rewards."
