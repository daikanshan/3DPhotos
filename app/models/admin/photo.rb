class Admin::Photo < ActiveRecord::Base
  mount_uploader :img, Admin::PhotosImgUploader
  belongs_to :album
  belongs_to :user
  
end
