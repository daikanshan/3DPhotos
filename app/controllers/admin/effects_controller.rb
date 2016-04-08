class Admin::EffectsController < AdminController
  before_action :set_admin_effect, only: [:show]
  layout false, only: [:show]

  # GET /admin/effects
  # GET /admin/effects.json
  def index
    @admin_effects = Admin::Effect.all
  end

  # GET /admin/effects/1
  # GET /admin/effects/1.json
  def show
    @photos = Admin::Photo.all
    render 'admin/effects/show'
  end

  # # GET /admin/effects/new
  # def new
  #   @admin_effect = Admin::Effect.new
  # end

  # # GET /admin/effects/1/edit
  # def edit
  # end

  # # POST /admin/effects
  # # POST /admin/effects.json
  # def create
  #   @admin_effect = Admin::Effect.new(admin_effect_params)

  #   respond_to do |format|
  #     if @admin_effect.save
  #       format.html { redirect_to @admin_effect, notice: 'Effect was successfully created.' }
  #       format.json { render :show, status: :created, location: @admin_effect }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @admin_effect.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # PATCH/PUT /admin/effects/1
  # # PATCH/PUT /admin/effects/1.json
  # def update
  #   respond_to do |format|
  #     if @admin_effect.update(admin_effect_params)
  #       format.html { redirect_to @admin_effect, notice: 'Effect was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @admin_effect }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @admin_effect.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /admin/effects/1
  # # DELETE /admin/effects/1.json
  # def destroy
  #   @admin_effect.destroy
  #   respond_to do |format|
  #     format.html { redirect_to admin_effects_url, notice: 'Effect was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_effect
      @admin_effect = Admin::Effect.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_effect_params
      params.require(:admin_effect).permit(:name)
    end
end
