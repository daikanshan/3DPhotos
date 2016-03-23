class Admin::User < ActiveRecord::Base
  has_secure_password
  has_many :albums
  has_many :photos
end
