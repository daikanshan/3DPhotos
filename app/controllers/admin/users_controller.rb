class Admin::UsersController < AdminController
  before_action :set_admin_user

  # GET /admin/users
  # GET /admin/users.json
  def index
  end

  # GET /admin/users/1
  # GET /admin/users/1.json
  def show
  end


  # GET /admin/users/1/edit
  def edit
  end
  def repassword

  end
  def update_password
    if @login_user.authenticate(params[:password_formal])
      if @admin_user.update(admin_user_params)
        format.html { redirect_to admin_users_path, notice: '更新成功.' }
        format.json { render :show, status: :ok, location: @admin_user }
      else
        format.html { render :edit }
        format.json { render json: @admin_user.errors, status: :unprocessable_entity }
      end
    end
  end
  # PATCH/PUT /admin/users/1
  # PATCH/PUT /admin/users/1.json
  def update
    respond_to do |format|
      if @admin_user.update(admin_user_params)
        format.html { redirect_to admin_users_path, notice: '更新成功.' }
        format.json { render :show, status: :ok, location: @admin_user }
      else
        format.html { render :edit }
        format.json { render json: @admin_user.errors, status: :unprocessable_entity }
      end
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_user
      @admin_user = @login_user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_user_params
      params.require(:admin_user).permit(:name, :password, :password_confirmation, :email, :avatar)
    end
end
