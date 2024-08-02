class AddTranslationsToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :name_en, :text
    add_column :products, :storage_en, :text
    add_column :products, :serving_en, :text
    add_column :products, :ingredients_en, :text
    add_column :products, :allergens_en, :text
  end
end
