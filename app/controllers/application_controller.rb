class ApplicationController < ActionController::Base

  before_action :set_locale

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
