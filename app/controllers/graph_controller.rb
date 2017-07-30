# This controller defines all the APIs for plotting the graph
class GraphController < ApplicationController

  # This function return all necessary data for client side to plot the impact by process graph
  def impact_by_process
    # Assume there are only 4 life cycle categories here
    @process_list = ["manufacturing", "transport", "energy use", "end of life"]
    @impact_data = [50.0, 30.0, 75.5, 100.0]

    respond_to do |format|
      format.json { render json: (@process_list + @impact_data).to_json }
      format.html { render json: (@process_list + @impact_data).to_json }
    end
  end

  # Once click on the analyze button -> call this function
  def create

  end

end
