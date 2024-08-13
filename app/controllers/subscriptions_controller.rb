# app/controllers/subscriptions_controller.rb
class SubscriptionsController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user.subscriptions.create
    redirect_to root_path, notice: "You have been subscribed to the newsletter."
  end
end
