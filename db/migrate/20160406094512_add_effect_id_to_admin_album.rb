class AddEffectIdToAdminAlbum < ActiveRecord::Migration
  def change
    add_column :admin_albums, :effect_id, :integer
  end
end
