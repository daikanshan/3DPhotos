class AdminController < ApplicationController
  before_action :check_login
  before_action :set_nav
  private
  def check_login
    @login_user = Admin::User.find_by_id(session[:user_id])
    if @login_user.nil?
      redirect_to admin_login_url
    end
  end

  def set_nav
    # 如果在开发模式下nav在每次页面加载时都会刷新
    # @navs = @cache.get 'nav', nil, Rails.env.development? do
      result = []
      raw = YAML.load(File.read('config/ext/admin_nav.yml'))["nav"]
      raw.each do |item|
        args = {}
        controllers = item["controllers"].split('|').map{|e| 'admin/'+e}
        actions = item["actions"].split('|').map{|e| e.split(',')}
        (0..controllers.length).each do |i|
          args[controllers[i]] = actions[i]
        end
        controller, action = item["path"].split('/')
        result << {text: item["text"], icon: item["icon"], options: {controller: 'admin/' + controller, action: action},args:args}
      end
      @navs = result
    # end
  end

end
