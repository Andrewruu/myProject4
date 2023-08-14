class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :fund, :user_with_orders

  def user_with_orders
    object.user_products.map {|order|
      {
        user_product_id: order.id,
        product_id: order.product.id,
        quantity: order.quantity
      }
  }
  end
end
