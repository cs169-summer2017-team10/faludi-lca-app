class Assembly < ApplicationRecord
  belongs_to :user
  has_many :parts
  serialize :components
end
