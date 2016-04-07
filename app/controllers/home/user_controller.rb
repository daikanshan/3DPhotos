class Home::UserController < HomeController
  def index
  	user = Admin::User.find_by_name(params[:name])
  	@albums = user.albums.order("created_at DESC") if user
  end
end
