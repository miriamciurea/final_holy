class OrdersController < ApplicationController
  before_action :set_cart

  def create
    order = current_user.orders.create(status: "pending", total: @cart.total_price)
    @cart.cart_items.each do |item|
      order.order_items.create(
        product: item.product,
        quantity: item.quantity,
        price: item.product.price
      )
    end

    @cart.destroy
    redirect_to order_path(order)
  end

  private

  def set_cart
    @cart = current_user.cart || current_user.create_cart
  end
end
