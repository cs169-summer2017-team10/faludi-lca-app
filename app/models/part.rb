class Part < ApplicationRecord
    belongs_to :assembly
    belongs_to :parent, class_name: "Part", :foreign_key => "parent_part_id"
    has_many :child_parts, class_name: "Part", :foreign_key => "parent_part_id"
end
