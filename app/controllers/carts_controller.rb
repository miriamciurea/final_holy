class CartsController < ApplicationController
  before_action :set_cart

  def add_item
    product = Product.find(params[:product_id])
    item = @cart.cart_items.find_or_initialize_by(product: product)
    item.quantity += 1
    item.save
    redirect_to cart_path
  end

  def remove_item
    item = @cart.cart_items.find(params[:id])
    item.destroy
    redirect_to cart_path
  end

  def update_quantity
    item = @cart.cart_items.find(params[:id])
    item.update(quantity: params[:quantity])
    redirect_to cart_path
  end

  def show
    @cart_items = @cart.cart_items
  end

  private

  def set_cart
    @cart = current_user.cart || current_user.create_cart
  end
end
