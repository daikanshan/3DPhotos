json.array!(@admin_albums) do |admin_album|
  json.extract! admin_album, :id, :name, :user_id, :cover
  json.url admin_album_url(admin_album, format: :json)
end
