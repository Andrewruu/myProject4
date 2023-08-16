Rails.application.routes.draw do
  resources :products, only: [:index, :destroy, :create, :update]
  resources :user_products, only: [:destroy, :create, :update]
  resources :users, only: [:destroy, :update]

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

end
