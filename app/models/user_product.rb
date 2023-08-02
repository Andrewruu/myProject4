class UserProduct < ApplicationRecord
    belongs_to :user
    belongs_to :product
    
    validates :quantity, presence: true, numericality: {only_integer: true, greater_than:0, less_than_or_equal_to:10}
    
end
