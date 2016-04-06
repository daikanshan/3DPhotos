# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
effects = ["yuansu","ring"]
effects.each do |e|
  Admin::Effect.find_by_name(e)||Admin::Effect.create(name:e)
end