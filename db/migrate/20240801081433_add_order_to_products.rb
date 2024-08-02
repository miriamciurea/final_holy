class AddOrderToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :order, :text
  end
end
