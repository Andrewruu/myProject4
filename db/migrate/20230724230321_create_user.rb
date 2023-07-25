class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password_digest
      t.decimal :fund, :precision => 10, :scale => 2

      t.timestamps
    end
  end
end
