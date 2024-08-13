class PaymentsController < ApplicationController

  def new
  end

  def create
    customer = Stripe::Customer.create({
      :email => params[:stripeEmail],
      :source => params[:stripeToken]
    })

    charge = Stripe::Charge.create({
      :customer => customer.id,
      :amount => 500,
      :description => 'Description of your product',
      :currency => 'usd'
    })

    rescue Stripe::CardError => e
      flash[:error] = e.message
      redirect_to new_payment_path
  end

  def index
    @stripe_products = Stripe::Product.list(limit: 10) # Fetches the first 10 products
  end

end
