class AssembliesController < ApplicationController
  protect_from_forgery with: :exception

  respond_to :json

  def index
    if params[:user_id]
      respond_with Assembly.where(user_id: params[:user_id])
    else
      respond_with Array.new
    end
    # respond_with Assembly.all
  end

  def create
    assembly_name = params[:name]
    assembly_content = params[:content]
    assembly = Assembly.new(user_id: params[:user_id], name: assembly_name, content: assembly_content)
    if assembly.save
      res_msg( 'Assembly successfully created', 201 )
    else
      res_msg( 'Assembly creation failed' , 500 )
    end

    # respond_with Assembly.create(assembly_params)
  end

  def update
    assembly = Assembly.where(user_id: params[:user_id], id: params[:id]).first
    if assembly.nil?
      render json: { :message => 'Assembly Not Found'}, status: 404
    else
      assembly.name = params[:name]
      assembly.content = params[:content]
      if assembly.save
        res_msg( 'Successfully updated', 200 )
      else
        res_msg('Update failed', 500 );
      end
    end

    # assembly = Assembly.find(params[:id])
    # if assembly.update_attributes(assembly_params)
    #   respond_with assembly
    # else
    #   render :json => { :error => "Update failed" }
    # end
  end

  def show
    respond_with Assembly.find(params[:id])
  end

  private
  def res_msg( msg, code )
    render json: {:message => msg }, status: code
  end

  def assembly_params
    # params.require(:assembly).permit(:id, :name, :content, :user_id)
    params[:assembly].permit!
    # params.require(:assembly).permit!
  end
end
