class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.text :name
      t.text :ingredients
      t.text :allergens
      t.text :serving
      t.text :storage
      t.string :price
      t.string :category
      t.string :part_of

      t.timestamps
    end
  end
end
