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

# Structure for these seed data
# John Oliver (User)
#   -> MacBook Pro 2017 (Assembly)
#     -> steel (Material)
#     -> gold (Material)
#     -> cpu (Subassembly)
#       -> gold (Material)
#     -> memory (Subassembly)
#       -> iron (Material)
#       -> ram (Subassembly)
#         -> gold (Material)
#         -> copper (Material)
#       -> hdd (Subassembly)
#         -> gold (Material)
#         -> copper (Material)

User.delete_all
Assembly.delete_all
Part.delete_all

# User
user = User.create!(name: "John Oliver", email: "johnoliver@hbo.com")

# Assembly
computer = Assembly.create!(name: "MacBook Pro 2017", user: user)

# Raw Material in Assembly
Part.create!( assembly_id: computer.id, parent: Part.new(id: nil), name: "steel")
Part.create!( assembly_id: computer.id, parent: Part.new(id: nil), name: "gold")

# Sub assembly in assembly
cpu = Part.create!(assembly_id: computer.id, parent: Part.new(id: nil), name: "cpu")
memory = Part.create!(assembly_id: computer.id, parent: Part.new(id: nil), name: "memory")

# Material in sub assembly
Part.create!(assembly_id: computer.id, parent: memory, name: "iron")
Part.create!(assembly_id: computer.id, parent: cpu, name: "gold")

# Sub assembly inside subassembly
ram = Part.create!(assembly_id: computer.id, parent: memory, name: "ram")
hdd = Part.create!(assembly_id: computer.id, parent: memory, name: "hdd")

# Material inside subassembly inside subassembly
Part.create!(assembly_id: computer.id, parent: ram, name: "gold")
Part.create!(assembly_id: computer.id, parent: ram, name: "copper")

Part.create!(assembly_id: computer.id, parent: hdd, name: "gold")
Part.create!(assembly_id: computer.id, parent: hdd, name: "copper")
