class AssembliesController < ApplicationController
  protect_from_forgery with: :exception

  respond_to :json

  def index
    respond_with Assembly.all
  end

  def create
    respond_with Assembly.create(assembly_params)
  end

  def show
    respond_with Assembly.find(params[:id])
  end

  # def upvote
  #   assembly = Assembly.find(params[:id])
  #   assembly.increment!(:upvotes)
  #
  #   respond_with assembly
  # end

  private
  def assembly_params
    params.require(:assembly).permit(:name, :content, :user_id)
  end
end
