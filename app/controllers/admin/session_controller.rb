class Admin::SessionController < AdminController
  skip_before_action :check_login
  layout false

  def reg

  end

  def do_reg
    @user = Admin::User.new(name:params[:name],password:params[:password],password_confirmation:params[:password_confirmation])
    if @user.save
      session[:user_id] = @user.id
      redirect_to admin_path,notice:"注册成功"
    else
      render :reg
    end
  end

  def new
    if session[:fail_login_time] && session[:fail_login_time] >= 1
      @show_vcode = true
    end
  end

  def create
    login_user = Admin::User.find_by_name(params[:name])
    if session[:fail_login_time] && session[:fail_login_time] >= 1
      if params[:vcode].nil? || params[:vcode].upcase != session[:vcode]
        redirect_to admin_login_path, alert:'请输入正确的验证码'
        return
      end
    end

    if login_user && login_user.authenticate(params[:password])
      session[:user_id] = login_user.id
      session[:fail_login_time] = 0
      redirect_to admin_path
    else
      session[:fail_login_time] = !session[:fail_login_time].nil? ? session[:fail_login_time]+1 : 1
      redirect_to admin_path, alert:"用户名或密码不正确！"
    end
    
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  def vcode
    response.headers['Cache-Control'] = "private, max-age=0, no-store, no-cache, must-revalidate"
    response.headers['Pragma'] = "no-cache"
    image = VerifyCode.build()
    # 给session设置vcode
    session[:vcode] = image[:code]
    # 把二进制数据发送给服务器
    send_data image[:blob], type: "image/png", disposition: 'inline'
  end
 
end
