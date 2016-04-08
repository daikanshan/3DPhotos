class Admin::User < ActiveRecord::Base
  validates :name, presence: true
  has_secure_password
  mount_uploader :avatar, Admin::AdminAvatarUploader
  has_many :albums
  has_many :photos

end
