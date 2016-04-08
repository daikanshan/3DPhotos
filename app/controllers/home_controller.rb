class HomeController < ApplicationController
	before_action :set_nav
	before_action :set_login_user
	def set_nav
		@all_categories = Admin::Category.all
	end
	def set_login_user
    	@login_user = Admin::User.find_by_id(session[:user_id]) if session[:user_id]
  	end
end
