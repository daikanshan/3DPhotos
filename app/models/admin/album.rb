class Admin::Album < ActiveRecord::Base
  belongs_to :user
  belongs_to :effect
  belongs_to :category
  has_many :photos
  mount_uploader :cover, Admin::AlbumCoverUploader

  validates :name, presence: true
  validates :cover, presence: true
  before_destroy :reset_photos

  def reset_photos
  	self.photos.clear
  end
end
