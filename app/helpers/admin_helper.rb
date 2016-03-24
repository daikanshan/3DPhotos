module AdminHelper
  def is_current(args)
    if args[params[:controller]] && args[params[:controller]].include?(params[:action])
      return "active"
    end
    return "inactive"
  end
  # 表单提交错误信息帮助方法
  def form_errors(var)
    if var.errors.any?
      str=<<STR
    <div class="alert alert-block alert-danger">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <h4>您提交的表单有#{var.errors.count}个错误 </h4>
      <ul>
STR
      var.errors.full_messages.each do |message|
        str+="<li>#{message}</li>"
      end
      str+="</ul></div>"
      raw str
    end
  end
end
