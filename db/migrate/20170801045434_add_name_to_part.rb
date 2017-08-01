class AddNameToPart < ActiveRecord::Migration[5.0]
  def change
    add_column :parts, :name, :string
  end
end
