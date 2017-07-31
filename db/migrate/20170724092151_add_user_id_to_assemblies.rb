class AddUserIdToAssemblies < ActiveRecord::Migration[5.0]
  def change
    add_column :assemblies, :user_id, :integer
  end
end
