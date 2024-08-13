Rails.application.routes.draw do
  get 'subscriptions/create'
  devise_for :users
  resources :users do
    collection do
      get 'admin'
    end
  end

  resources :cart_items, only: [:new, :create]

  resources :payments

  get 'products/filter', to: 'products#filter'
  resources :products do
    collection do
      get 'filter_by_category'
      get 'shop'
      get 'menu'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root "pages#home"
  get "about", to: "pages#about_us"
  get "contact", to: "pages#contact"
  get "workshop", to: "pages#workshop"
  # get "privacy", to: "pages#privacy"
  # get "terms", to: "pages#terms"

  # Routes for newsletters
  resources :newsletters, only: [:new, :create, :index]


  get 'switch_language', to: 'application#switch_language'
end
