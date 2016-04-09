class Home::HomeController < HomeController
  layout false,only:[:show]
  def index
    @albums = Admin::Album.all.order("created_at DESC").page(params[:page]).per(5)
  end

  def show
    @photos = []
    @user = Admin::User.find_by_name(params[:username])
    @album = @user.albums.find_by_name(params[:albumname]) if @user
    photos = @album.photos if @album
    photos.each {|p| @photos<<p }
  end

  def category
    category = Admin::Category.find_by_name(params[:albumname])
    @albums = category.albums.order("created_at DESC").page(params[:page]).per(8) if category
    render :index
  end
end
