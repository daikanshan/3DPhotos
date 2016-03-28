class Home::HomeController < HomeController
  def index
    @albums = Admin::Album.all
  end

  def show
    @user = Admin::User.find_by_name(params[:username])
    @album = @user.albums.find_by_name(params[:albumname]) if @user
    @photos = @album.photos if @album
  end
end
