class AddGlyphiconToAdminCategory < ActiveRecord::Migration
  def change
    add_column :admin_categories, :glyphicon, :string
  end
end
