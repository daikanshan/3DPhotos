class CreateAdminAlbums < ActiveRecord::Migration
  def change
    create_table :admin_albums do |t|
      t.string :name
      t.integer :user_id
      t.string :cover

      t.timestamps null: false
    end
  end
end
