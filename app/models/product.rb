class Product < ApplicationRecord

  has_many_attached :photos

  validates :name, :name_en, :price, :storage, :storage_en, :serving, :serving_en, :category, :part_of, :ingredients, :ingredients_en, :allergens, :allergens_en, presence: true

  CATEGORIES = [
    "Gluten Free",
    "Bread",
    "Artisan",
    "Cookies",
    "Pastry",
    "Sweets"
  ]

end
