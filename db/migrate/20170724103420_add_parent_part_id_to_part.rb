class AddParentPartIdToPart < ActiveRecord::Migration[5.0]
  def change
    add_column :parts, :parent_part_id, :integer
  end
end
