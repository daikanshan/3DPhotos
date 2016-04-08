class AddModelTypeToAdminAlbum < ActiveRecord::Migration
  def change
    add_column :admin_albums, :model_type, :string
  end
end
