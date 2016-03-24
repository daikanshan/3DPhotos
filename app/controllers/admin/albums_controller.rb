class Admin::AlbumsController < AdminController
  before_action :set_admin_album, only: [:show, :edit, :update, :destroy]

  # GET /admin/albums
  # GET /admin/albums.json
  def index
    @admin_albums = @login_user.albums
  end

  # GET /admin/albums/1
  # GET /admin/albums/1.json
  def show
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
        format.html { redirect_to @admin_album, notice: 'Album was successfully created.' }
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
        format.html { redirect_to @admin_album, notice: 'Album was successfully updated.' }
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
      format.html { redirect_to admin_albums_url, notice: 'Album was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_album
      @admin_album = Admin::Album.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_album_params
      params.require(:admin_album).permit(:name, :user_id, :cover)
    end
end
