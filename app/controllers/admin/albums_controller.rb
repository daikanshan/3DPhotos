class Admin::AlbumsController < AdminController
  before_action :set_admin_album, only: [:show, :edit, :update, :destroy]
  before_action :set_needed_info, only: [:new, :edit, :create, :update]

  # GET /admin/albums
  # GET /admin/albums.json
  def index
    @admin_albums = @login_user.albums.order("created_at DESC").page(params[:page]).per(11)
  end

  # GET /admin/albums/1
  # GET /admin/albums/1.json
  def show
    @album_photos = @admin_album.photos
  end

  def upload_photo
    @admin_album = @login_user.albums.find_by_name(params[:name])
    if @admin_album.nil?
      redirect_to admin_albums_url, notice: '未选择相册！' && return
    end
    @admin_photo = Admin::Photo.new
  end

  def uploading_photo
    @errors = []
    album = @login_user.albums.find_by_name(params[:name])
    redirect_to admin_albums_url if !album && return
    admin_photo_params.each do |p|
      photo = Admin::Photo.new(img:p,user_id:@login_user.id)
      if photo.save
        album.photos << photo
      else
        @errors << photo.errors
      end
    end
    respond_to do |format|
      if @errors.empty?
        format.html { redirect_to album, notice: '上传成功.' }
        format.json { render :show, status: :created, location: @admin_photo }
      else
        format.html { render :upload_photo }
        format.json {  }
      end
    end
  end


  def upload_photo_online
    @admin_album = @login_user.albums.find_by_name(params[:name])
    @admin_photos = @login_user.photos.where(album_id:nil)
  end

  def uploading_photo_online
    album = @login_user.albums.find_by_name(params[:name])
    redirect_to admin_albums_url if !album && return
    params[:target].each do |id|
      photo = @login_user.photos.find_by_id(id)
      album.photos << photo if photo
    end
    redirect_to album
  end
  def remove
    current_album = Admin::Album.find_by_id(params[:album])
    removed_photo = Admin::Photo.find_by_id(params[:photo])
    current_album.photos.delete(removed_photo)
    redirect_to current_album
  end

  # GET /admin/albums/new
  def new
    @admin_album = Admin::Album.new
  end

  # GET /admin/albums/1/edit
  def edit
    
  end

  # POST /admin/albums
  # POST /admin/albums.json
  def create
    @admin_album = Admin::Album.new(admin_album_params)
    @admin_album.user_id = @login_user.id
    respond_to do |format|
      if @admin_album.save
        format.html { redirect_to @admin_album, notice: '相册已经创建成功，快去给它添加相片吧～' }
        format.json { render :show, status: :created, location: @admin_album }
      else
        format.html { render :new }
        format.json { render json: @admin_album.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/albums/1
  # PATCH/PUT /admin/albums/1.json
  def update
    respond_to do |format|
      if @admin_album.update(admin_album_params)
        format.html { redirect_to admin_albums_url, notice: '已更新.' }
        format.json { render :show, status: :ok, location: @admin_album }
      else
        format.html { render :edit }
        format.json { render json: @admin_album.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/albums/1
  # DELETE /admin/albums/1.json
  def destroy
    @admin_album.destroy
    respond_to do |format|
      format.html { redirect_to admin_albums_url, notice: '已删除.' }
      format.json { head :no_content }
    end
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_album
      @admin_album = Admin::Album.find(params[:id])
    end
    def set_needed_info
      @effects = Admin::Effect.all
      @categories = Admin::Category.all
    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_album_params
      params.require(:admin_album).permit(:name, :user_id, :cover, :cover_cache, :effect_id, :category_id)
    end

    def admin_photo_params
      params.require(:photos)
    end
end
