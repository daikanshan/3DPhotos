class Admin::User < ActiveRecord::Base
  has_secure_password
  mount_uploader :avatar, Admin::AdminAvatarUploader
  has_many :albums
  has_many :photos
end
