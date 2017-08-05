class AssembliesController < ApplicationController
  before_action :set_assembly, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :index, :show, :new, :edit, :update, :destroy]

  # The followings action required user login

  # GET /assemblies
  # GET /assemblies.json
  def index
    redirect_to profile_path
  end

  # GET /assemblies/1
  # GET /assemblies/1.json
  def show
    @assembly = Assembly.where(id: params[:id]).first
    if @assembly.nil?
      redirect_to new_assembly_path
      return
    end
    p @assembly.components
    respond_to do |format|
      format.html
      format.json { render json: @assembly.components.to_json }
    end
  end

  # GET /assemblies/new
  def new
  end

  # GET /assemblies/1/edit
  def edit
    redirect_to assembly_path
  end

  # POST /assemblies
  # POST /assemblies.json
  def create
    user = User.find(current_user)
    assembly_name = params[:build].keys[0]
    hash = params[:build]
    @assembly = Assembly.new(user: user, name: assembly_name, components: hash )

    if @assembly.save
      render json: {"url" => assembly_path(@assembly)}, location: assembly_path(@assembly), status: 200
    else
      render json: {"url" => new_assembly_path}, location: new_assembly_path , status: 500
    end
  end

  # PATCH/PUT /assemblies/1
  # PATCH/PUT /assemblies/1.json
  def update
    user = User.find(current_user)
    assembly_id = params[:assembly_id]
    @assembly = Assembly.where( user: user, id: assembly_id ).first

    respond_to do |format|
      if @assembly.nil?
        format.json { render json: { "message" => "Fail to save" }, status: 500 }
      else
        @assembly.components = params[:build]
        @assembly.save
        format.json { render json: { "message" => "Saved" }, status: 200 }
      end
    end
  end

  # DELETE /assemblies/1
  # DELETE /assemblies/1.json
  def destroy
    @assembly.destroy
    # respond_to do |format|
    #   format.html { redirect_to assemblies_url, notice: 'Assembly was successfully destroyed.' }
    #   format.json { head :no_content }
    # end
  end

  # GET /empty_assembly.json
  # This function return an empty assembly json data
  def empty_assembly
    respond_to do |format|
      format.json { render json: Assembly.empty_assembly }
    end
  end

  # The followings are public actions

  # GET /show_lib.json
  # This function should return json data representing the library bar
  def show_lib
    respond_to do |format|
      format.json { render json: Assembly.lib }
    end
  end

  # GET /sample_assembly.json
  # This function return a sample assembly json data
  def sample_assembly
    respond_to do |format|
      format.json { render json: Assembly.sample_assembly }
    end
  end

  # GET /assemblies-not-exist
  def not_exist
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assembly
      begin
        @assembly = Assembly.find(params[:id])
      rescue Exception => e
        redirect_to :action => "not_exist"
        print e
        return
      end
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assembly_params
      params.fetch(:assembly, {})
    end
end
