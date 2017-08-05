class Assembly < ApplicationRecord
  belongs_to :user
  has_many :parts
  serialize :components, JSON

  def self.sample_assembly
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
                                        "name": "Gold",
                                        "quantity": 1,
                                        "unit": "kg"
                                    },
                                    {
                                        "type": "container",
                                        "name": "DRAM",
                                        "columns": [
                                            [
                                                {
                                                    "type": "material",
                                                    "name": "Steel",
                                                    "quantity": 1,
                                                    "unit": "kg"
                                                }
                                            ]
                                        ]
                                    }
                                ]
                            ]
                        },
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
                                                "name": "Gold",
                                                "quantity": 1,
                                                "unit": "kg"
                                            },
                                            {
                                                "type": "container",
                                                "name": "LED",
                                                "columns":
                                                    [
                                                        [
                                                            {
                                                                "type": "material",
                                                                "name": "Glass",
                                                                "quantity": 1,
                                                                "unit": "kg"
                                                            }
                                                        ]
                                                    ]
                                            }
                                        ]
                                    ]
                            },
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
                                            "name": "Gold",
                                            "quantity": 1,
                                            "unit": "kg"
                                        },
                                        {
                                            "type": "container",
                                            "name": "Capacitor",
                                            "columns": [
                                                [
                                                    {
                                                        "type": "material",
                                                        "name": "Wood",
                                                        "quantity": 1,
                                                        "unit": "kg"
                                                    },
                                                    {
                                                        "type": "material",
                                                        "name": "Ceramics",
                                                        "quantity": 1,
                                                        "unit": "kg"
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
                                                        "name": "Wood",
                                                        "quantity": 1,
                                                        "unit": "kg"
                                                    },
                                                    {
                                                        "type": "material",
                                                        "name": "Ceramics",
                                                        "quantity": 1,
                                                        "unit": "kg"
                                                    }
                                                ]
                                            ]
                                        }
                                    ]
                                ]
                        },
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
  end

  def self.empty_assembly
    empty_assemblies = {'New Assembly':[{'type':'container','name':'New SubAssembly','columns':[[]]}]}
  end

  def self.lib
     lib =
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
     return lib
  end

end
