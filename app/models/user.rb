class User < ApplicationRecord
    has_many :user_products
    has_many :products, through: :user_products
    
    validates :name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :fund, presence: true, numericality: {greater_than_or_equal_to:0}

    has_secure_password

end
