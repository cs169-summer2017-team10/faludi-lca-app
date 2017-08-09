# This controller defines all the APIs for plotting the graph
class GraphController < ApplicationController

  def index
    create
  end

  # Once click on the analyze button -> call this function
  def create
    data = {}
    labels = []
    avg = []
    low_uncertainty = []
    high_uncertainty = []
    #@assem = Assembly.find(session[:assembly_id])
    #@assem_name = model.keys[0]
    #model = model.components[@assem_name]
    model = {
        "MacBook Pro": [
            {
                "type": "container",
                "name": "Memory",
                "columns": [
                    [
                        {
                            "type": "material",
                            "name": "Copper",
                            "quantity": 1,
                            "unit": "kg"
                        },
                        {
                            "type": "material",
                            "name": "Iron",
                            "quantity": 1,
                            "unit": "kg"
                        },
                        {
                            "type": "material",
                            "name": "Silver",
                            "quantity": 1,
                            "unit": "kg"
                        }
                    ]
                ]
            },
            {
                "type": "material",
                "name": "Wood",
                "quantity": 1,
                "unit": "kg"
            },
            {
                "type": "material",
                "name": "Glass",
                "quantity": 1,
                "unit": "kg"
            },
            {
                "type": "material",
                "name": "PVC",
                "quantity": 1,
                "unit": "kg"
            }
        ]
    }
    model = model[:"MacBook Pro"]
    model.each do |item_hash|
      labels.append(item_hash[:"name"])
      if item_hash[:"type"] == "container"
        total = [0, 0, 0]
        item_hash[:"columns"].each do |child|
          total = subassembly_read(child, total)
        end
        p "+++++++++++++++++++++++++++++"
        p total
        avg.append(total[0])
        low_uncertainty.append(total[1])
        high_uncertainty.append(total[2])
      else
        # database/ search material info here along with appropriate units
        average = 2 * item_hash[:"quantity"]
        avg.append(average)
        low = 0.8
        low_uncertainty.append(low)
        high = 0.8
        high_uncertainty.append(high)
      end
    end
    data[:"labels"] = labels
    p "****************************"
    data[:"average"] = avg
    p avg
    data[:"low"] = low_uncertainty
    p low_uncertainty
    data[:"high"] = high_uncertainty
    gon.data = data.to_json
  end

  #returns an array with accumulated values [avg, low_uncertainty, high_uncertainty]
  def subassembly_read(hash, arr)
    if hash.is_a?(Hash)

      if hash[:"type"] == "material"
        arr[0] = arr[0] + 2  * hash[:"quantity"]
        arr[1] = arr[1] + 0.8
        arr[2] = arr[2] + 0.8
        p "^^^^^^^^^^^^^^^^^^^^^^^^^"
        p arr
        return arr
      else
        # p "|||||||||||||||||||||||||||"
        # p hash
        p "!!!!!!!!!!!!!!!!!!!!!!!!!!"
        p hash[:"columns"]
        return subassembly_read(hash[:"columns"], arr)
        #
        # arr[0] = arr[0] + trial[0]
        # arr[1] = arr[1] + trial[1]
        # arr[2] = arr[2] + trial[2]
      end
    else
      p "[[[[[[[[[[[[[[[[[[[["
      p hash
      total = [0, 0, 0]
      hash.each do |child_hash|
        # p "*************************"
        # p child_hash
        total = subassembly_read(child_hash, arr)
      end
      return total
    end
  end

end
