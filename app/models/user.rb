class User < ApplicationRecord
    has_many :user_products
    has_many :products, through: :user_products
    
    validates :name, presence: true
    validates :username, presence: true, uniqueness: true
    has_secure_password

    
    
end
