class Admin::SessionController < AdminController
  skip_before_action :check_login
  layout false

  def new
  end

  def create
    login_user = Admin::User.find_by_name(params[:name])
    if login_user && login_user.authenticate(params[:password])
      session[:user_id] = login_user.id
    end
    redirect_to admin_path, alert:"用户名或密码不正确！"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end
