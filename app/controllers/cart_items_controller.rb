class CartItemsController < ApplicationController
  before_action :authenticate_user!

  def create
    if current_user.nil?
      render json: { status: 'error', message: 'User not logged in' }, status: :unauthorized
      return
    end

    # Create cart if it does not exist
    @cart = current_user.cart || current_user.create_cart

    # Find or initialize the cart item
    @cart_item = @cart.cart_items.find_or_initialize_by(product_id: params[:product_id])
    @cart_item.quantity = params[:quantity]

    if @cart_item.save
      render json: {
        status: 'success',
        product: @cart_item.product,
        quantity: @cart_item.quantity,
        cart_item_count: @cart.cart_items.count # Include total cart item count for sidebar
      }
    else
      render json: { status: 'error', message: 'Failed to add item to cart' }, status: :unprocessable_entity
    end
  end
end
