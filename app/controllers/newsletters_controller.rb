# app/controllers/newsletters_controller.rb
class NewslettersController < ApplicationController
  before_action :authenticate_admin!

  def new
    @newsletter = Newsletter.new
  end

  def create
    @newsletter = Newsletter.new(newsletter_params)
    if @newsletter.save
      send_newsletter(@newsletter)
      redirect_to newsletters_path, notice: 'Newsletter sent successfully.'
    else
      render :new
    end
  end

  private

  def newsletter_params
    params.require(:newsletter).permit(:title, :content)
  end

  def send_newsletter(newsletter)
    User.find_each do |user|
      UserMailer.with(user: user, newsletter: newsletter).newsletter_email.deliver_now
    end
  end

def authenticate_admin!
  redirect_to root_path, alert: 'Access denied' unless current_user&.admin?
end
end
