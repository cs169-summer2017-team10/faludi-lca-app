class Assembly < ApplicationRecord
  belongs_to :user
  serialize :content, JSON
end
