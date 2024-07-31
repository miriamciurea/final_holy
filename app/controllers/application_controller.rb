class ApplicationController < ActionController::Base

  before_action :set_locale

  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :address, :email, :phone])

    # For additional in app/views/devise/registrations/edit.html.erb
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :address, :email, :phone])
  end

  def switch_language
    new_locale = I18n.locale == :en ? :ro : :en
    cookies[:locale] = new_locale
    redirect_back(fallback_location: root_path)
  end

  private

  def set_locale
    I18n.locale = cookies[:locale] || I18n.default_locale
  end
end
