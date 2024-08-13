class Cart < ApplicationRecord
  belongs_to :user
  has_many :cart_items, dependent: :destroy
  has_many :products, through: :cart_items

  validates :user, presence: true

  def total_price
    cart_items.inject(0) { |sum, item| sum + item.quantity * item.product.price.to_f }
  end
end
