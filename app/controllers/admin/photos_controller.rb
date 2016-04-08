class Admin::PhotosController < AdminController
  # include ActionController::Live
  before_action :set_admin_photo, only: [:show, :edit, :update, :destroy]
  before_action :set_all_albums, only: [:new, :edit, :update, :create]
  skip_before_action :check_login, only: [:upload_process]


  # GET /admin/photos
  # GET /admin/photos.json
  def index
    @admin_photos = @login_user.photos
    # respond_to do |format|
    #   format.json { render :json => @admin_photos.collect { |p| p.to_jq_upload }.to_json }
    # end
    
  end

  # GET /admin/photos/1
  # GET /admin/photos/1.json
  def show
  end

  # GET /admin/photos/new
  def new
    @admin_photo = Admin::Photo.new
  end

  # GET /admin/photos/1/edit
  def edit
  end

  # POST /admin/photos
  # POST /admin/photos.json
  # def upload_process
  #   session["process"] = 0 if session["process"].nil?
  #   response.headers['Content-Type'] = 'text/event-stream'
  #   response.stream.write "data: #{session["process"]}%\n\n"
  #   sleep 2
  # ensure
  #   response.stream.close
  # end
  def result

  end
  def upload
    @errors = []
    user_id = @login_user.id
    admin_photo_params.each do |p|
      admin_photo = Admin::Photo.new(img:p,user_id:user_id)
      if !admin_photo.save
        @errors << admin_photo
      end
    end

    render :result
  end

  # PATCH/PUT /admin/photos/1
  # PATCH/PUT /admin/photos/1.json
  def update
    respond_to do |format|
      if @admin_photo.update(admin_photo_params)
        format.html { redirect_to admin_photos_url, notice: 'Photo was successfully updated.' }
        format.json { render :show, status: :ok, location: @admin_photo }
      else
        format.html { render :edit }
        format.json { render json: @admin_photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/photos/1
  # DELETE /admin/photos/1.json
  def destroy
    @admin_photo.destroy
    respond_to do |format|
      format.html { redirect_to admin_photos_url, notice: '删除成功.' }
      format.json { render :json => true }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_photo
      @admin_photo = Admin::Photo.find(params[:id])
    end

    def set_all_albums

      @all_albums = []
      all_albums = @login_user.albums
      all_albums.each {|t| @all_albums << [t.name,t.id]}
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_photo_params
      params.require(:admin_photo_imgs)
    end
end
