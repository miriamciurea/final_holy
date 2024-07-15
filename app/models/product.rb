class Product < ApplicationRecord

  has_many_attached :photos

  validates :name, :price, :storage, :serving, :category, :part_of, :ingredients, :allergens, presence: true
end
