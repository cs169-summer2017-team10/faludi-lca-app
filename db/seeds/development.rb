# Material.delete_all
# Material.create!(:title => "Steel", :category => "Metal")
# Material.create!(:title => "Copper", :category => "Metal")
# Material.create!(:title => "Aluminum", :category => "Metal")
# Material.create!(:title => "Concrete", :category => "Ceramic")
# Material.create!(:title => "Glass", :category => "Ceramic")
# Material.create!(:title => "Clay", :category => "Ceramic")
# Material.create!(:title => "Wood", :category => "Wood")
# Material.create!(:title => "Acids", :category => "Chemicals")
# Material.create!(:title => "Epoxy", :category => "Polymers")
#
# Procedure.delete_all
# Procedure.create!(:title => "Rail", :material => "Copper", :category => "Transportation")
# Procedure.create!(:title => "Truck",:material => "Copper",  :category => "Transportation")
# Procedure.create!(:title => "Boat",:material => "Copper",  :category => "Transportation")
# Procedure.create!(:title => "Plane", :material => "Copper", :category => "Transportation")
#
# Procedure.create!(:title => "Hot Roll", :category => "Manufacturing", :material => "Steel")
# Procedure.create!(:title => "Cold Roll", :category => "Manufacturing", :material => "Steel")
# Procedure.create!(:title => "Tempering", :category => "Manufacturing", :material => "Glass")
#
# Procedure.create!(:title => "Landfill",:material => "Copper",  :category => "EoL")
# Procedure.create!(:title => "Recycle", :material => "Copper", :category => "EoL")

user = User.create(name: "John Oliver", email: "johnoliver@hbo.com")

computer = Assembly.create(name: "MacBook Pro 2017", user: user)

cpu = Part.create(assembly_id: computer.id)
memory = Part.create(assembly_id: computer.id)

hardDisk = Part.create(assembly_id: computer, parent_part_id: memory.id)
ram = Part.create(assembly_id: computer, parent_part_id: memory.id)
