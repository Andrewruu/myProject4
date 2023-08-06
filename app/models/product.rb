class Product < ApplicationRecord
    has_many :user_products
    has_many :users, through: :user_products

    validates :price, presence: true, numericality: {greater_than_or_equal_to:0}
    validates :name, presence: true
    validates :description, presence: true, length: {minimum: 15}
    validates :image, format: {with: /\.(png|jpg|jpeg)\Z/i}

end
