class Admin::Album < ActiveRecord::Base
  belongs_to :user
  belongs_to :effect
  has_many :photos
  mount_uploader :cover, Admin::AlbumCoverUploader

  validates :cover, presence: true
  before_destroy :reset_photos

  def reset_photos
  	self.photos.clear
  end
end
