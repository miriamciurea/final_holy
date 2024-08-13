class UserMailer < ApplicationMailer
  def newsletter_email
    @user = params[:user]
    @newsletter = params[:newsletter]
    mail(to: @user.email, subject: @newsletter.title)
  end
end
