class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :image, :product_with_users

  def product_with_users
    unique_users = object.users.uniq {|user| user.id}
    unique_users.map do |user|
      order_quantity = user.user_products.filter {|order| order.product_id == object.id}
      total_quantity = order_quantity.sum(&:quantity)
        {
          user_name: user.name,
          user_fund: user.fund,
          total_quantity: total_quantity
        }
      
    end
  end
end
