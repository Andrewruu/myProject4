class CreateUserProduct < ActiveRecord::Migration[6.1]
  def change
    create_table :user_products do |t|
      t.integer :user_id
      t.integer :product_id
      t.integer :quantity

      t.timestamps
    end
  end
end
