class AddCategoryIdToAdminAlbums < ActiveRecord::Migration
  def change
    add_column :admin_albums, :category_id, :integer
  end
end
