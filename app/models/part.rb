# class Part < ApplicationRecord
#
#     validates_uniqueness_of :title, :on => :create
#
#     def self.find_part(title)
#         # This is very unsafe and need to add salt to it.
#         return Part.where('title LIKE :query', query: "%#{title}%").first
#     end
# end
class Part < ApplicationRecord
    belongs_to :assembly
    belongs_to :parent, class_name: "Part", :foreign_key => "parent_part_id"
    has_many :child_parts, class_name: "Part", :foreign_key => "parent_part_id"
end
