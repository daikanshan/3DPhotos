# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
effects = ["yuansu","ring","gallary","panorama"]
effects.each do |e|
  Admin::Effect.find_by_name(e)||Admin::Effect.create(name:e)
end

categories = {'人物' => 'user', '景物' => 'leaf', '运动' => 'road', '创意' => 'apple'}
categories.each do |k,v|
	Admin::Category.find_by_name(k)||Admin::Category.create(name:k,glyphicon:v)
end