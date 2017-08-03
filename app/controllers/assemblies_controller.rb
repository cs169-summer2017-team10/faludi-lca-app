class AssembliesController < ApplicationController
  before_action :set_assembly, only: [:show, :edit, :update, :destroy]
  skip_before_action :set_assembly, only: [:show_lib]

  # GET /assemblies
  # GET /assemblies.json
  def index
    @assemblies = Assembly.all
  end

  # GET /assemblies/1
  # GET /assemblies/1.json
  def show

  end

  # GET /show_lib
  # GET /show_lib.json
  # This function should return json data representing the library bar
  def show_lib

     sample_lib =
        [{
           # Materials
           "type": "container",
           "name": "Metals",
           "columns": [
              {
                 "type": "container-lib",
                 "name": "Metal",
                 "columns":
                    [[
                       {
                           "type": "material",
                           "name": "Gold"
                       },
                       {
                           "type": "material",
                           "name": "Iron"
                       },
                       {
                           "type": "material",
                           "name": "Silver"
                       },
                       {
                           "type": "material",
                           "name": "Copper"
                       }
                    ]]
              },
              {
                 "type": "container-lib",
                 "name": "Nonmetal",
                 "columns":
                    [[
                       {
                           "type": "material",
                           "name": "PVC"
                       },
                       {
                           "type": "material",
                           "name": "Wood"
                       },
                       {
                           "type": "material",
                           "name": "Paper"
                       },
                       {
                           "type": "material",
                           "name": "Glass"
                       }
                    ]]
              }
          ]
        },
        {
           # Processes
           "type": "container",
           "name": "Process",
           "columns": [
              {
                 "type": "process",
                 "name": "Hot Rolling"
              },
              {
                 "type": "process",
                 "name": "Cold Rolling"
              }
           ]
        },
        {
           # Processes
           "type": "container",
           "name": "Transportation",
           "columns": [
              {
                 "type": "process",
                 "name": "Air"
              },
              {
                 "type": "process",
                 "name": "Boat"
              },
              {
                 "type": "process",
                 "name": "Truck"
              },
              {
                 "type": "process",
                 "name": "Train"
              }
           ]
        }]

    respond_to do |format|
      format.json { render json: sample_lib.to_json }
    end

  end

  # GET /show_assemblies
  # GET /show_assemblies.json
  # This function should return json data representing the assemblies
  def show_assemblies

    sample_assemblies = {
        "MacBook Pro": [
            {
                "type": "container",
                "name": "Memory",
                "columns": [
                    [
                        {
                            "type": "container",
                            "name": "RAM",
                            "columns": [
                                [
                                    {
                                        "type": "material",
                                        "name": "Gold"
                                    },
                                    {
                                        "type": "container",
                                        "name": "DRAM",
                                        "columns": [
                                            [
                                                {
                                                    "type": "material",
                                                    "name": "Steel"
                                                }
                                            ]
                                        ]
                                    }
                                ]
                            ]
                        },
                        {
                            "type": "material",
                            "name": "Copper"
                        },
                        {
                            "type": "material",
                            "name": "Iron"
                        },
                        {
                            "type": "material",
                            "name": "Silver"
                        }
                    ]
                ]
            },
            {
                "type": "container",
                "name": "Screen",
                "columns":
                    [
                        [
                            {
                                "type": "container",
                                "name": "LCD module",
                                "columns":
                                    [
                                        [
                                            {
                                                "type": "material",
                                                "name": "Gold"
                                            },
                                            {
                                                "type": "container",
                                                "name": "LED",
                                                "columns":
                                                    [
                                                        [
                                                            {
                                                                "type": "material",
                                                                "name": "Glass"
                                                            }
                                                        ]
                                                    ]
                                            }
                                        ]
                                    ]
                            },
                            {
                                "type": "material",
                                "name": "Copper"
                            },
                            {
                                "type": "material",
                                "name": "Iron"
                            },
                            {
                                "type": "material",
                                "name": "Silver"
                            }
                        ]
                    ]
            },
            {
                "type": "container",
                "name": "Motherboard",
                "columns": [
                    [
                        {
                            "type": "container",
                            "name": "PCIE-X",
                            "columns":
                                [
                                    [
                                        {
                                            "type": "material",
                                            "name": "Gold"
                                        },
                                        {
                                            "type": "container",
                                            "name": "Capacitor",
                                            "columns": [
                                                [
                                                    {
                                                        "type": "material",
                                                        "name": "Wood"
                                                    },
                                                    {
                                                        "type": "material",
                                                        "name": "Ceramics"
                                                    }
                                                ]
                                            ]
                                        },
                                        {
                                            "type": "container",
                                            "name": "Resistor",
                                            "columns": [
                                                [
                                                    {
                                                        "type": "material",
                                                        "name": "Wood"
                                                    },
                                                    {
                                                        "type": "material",
                                                        "name": "Ceramics"
                                                    }
                                                ]
                                            ]
                                        }
                                    ]
                                ]
                        },
                        {
                            "type": "material",
                            "name": "Copper"
                        },
                        {
                            "type": "material",
                            "name": "Iron"
                        },
                        {
                            "type": "material",
                            "name": "Silver"
                        }
                    ]
                ]
            },
            {
                "type": "material",
                "name": "Wood"
            },
            {
                "type": "material",
                "name": "Glass"
            },
            {
                "type": "material",
                "name": "PVC"
            }
        ]
    }

    respond_to do |format|
      format.html { render action: "show_lib" }
      format.json { render json: sample_assemblies.to_json }
    end
  end

  # GET /assemblies/new
  def new
    @assembly = Assembly.new
  end

  # GET /assemblies/1/edit
  def edit
  end

  # POST /assemblies
  # POST /assemblies.json
  def create
    @assembly = Assembly.new(assembly_params)

    respond_to do |format|
      if @assembly.save
        format.html { redirect_to @assembly, notice: 'Assembly was successfully created.' }
        format.json { render :show, status: :created, location: @assembly }
      else
        format.html { render :new }
        format.json { render json: @assembly.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /assemblies/1
  # PATCH/PUT /assemblies/1.json
  def update
    respond_to do |format|
      if @assembly.update(assembly_params)
        format.html { redirect_to @assembly, notice: 'Assembly was successfully updated.' }
        format.json { render :show, status: :ok, location: @assembly }
      else
        format.html { render :edit }
        format.json { render json: @assembly.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /assemblies/1
  # DELETE /assemblies/1.json
  def destroy
    @assembly.destroy
    respond_to do |format|
      format.html { redirect_to assemblies_url, notice: 'Assembly was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assembly
      @assembly = Assembly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def assembly_params
      params.fetch(:assembly, {})
    end
end
