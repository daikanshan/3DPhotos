class Admin::Album < ActiveRecord::Base
  belongs_to :user
  has_many :photos
  mount_uploader :cover, Admin::AlbumCoverUploader

  validates :cover, presence: true
end
