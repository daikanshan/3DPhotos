class CreateAdminPhotos < ActiveRecord::Migration
  def change
    create_table :admin_photos do |t|
      t.string :name
      t.integer :user_id
      t.string :img
      t.integer :album_id

      t.timestamps null: false
    end
  end
end
