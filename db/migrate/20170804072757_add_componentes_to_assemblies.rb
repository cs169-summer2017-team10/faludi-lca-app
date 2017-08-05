class AddComponentesToAssemblies < ActiveRecord::Migration[5.0]
  def change
    add_column :assemblies, :components, :string
  end
end
