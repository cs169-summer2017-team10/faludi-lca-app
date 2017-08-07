# This controller defines all the APIs for plotting the graph
class GraphController < ApplicationController

  def index
    # data_json = params[:data]
    # gon.data = data_json
    create
  end

  # Once click on the analyze button -> call this function
  def create
    data = []
    labels = []
    avg = []
    low_uncertainty = []
    high_uncertainty = []
    model = Assembly.find(session[:assembly_id]).components
    model.each do |index, item_hash|
      labels.append(item_hash)
      if item_hash["name"].is_a?(Hash)
        arr = subassembly_read(item_hash["name"])
        avg.append(arr[0])
        low_uncertainty.append(arr[1])
        high_uncertainty.append(arr[2])
      end

      p index
      p item_hash
    end
    data.append(labels)
    data.append(avg)
    data.append(low_uncertainty)
    data.append(high_uncertainty)
    gon.data = data.to_json
  end

  #returns an array with accumulated values [avg, low_uncertainty, high_uncertainty]
  def subassembly_read(hash)

  end

end
