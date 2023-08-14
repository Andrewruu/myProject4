class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :image, :product_with_users

  def product_with_users
    unique_users = object.users.uniq {|user| user.id}
    unique_users.map do |user|
        {
          user_id: user.id,
          user_name: user.name,
          user_fund: user.fund
        }
      
    end
  end
end
