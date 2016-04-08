json.array!(@admin_effects) do |admin_effect|
  json.extract! admin_effect, :id, :name
  json.url admin_effect_url(admin_effect, format: :json)
end
