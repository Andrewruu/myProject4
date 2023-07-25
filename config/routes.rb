Rails.application.routes.draw do
  resources :products, only: [:index]

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch '/users/:id', to: 'users#update'

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/new-order", to: "user_products#create"
  get "/orders", to: "user_products#index"
end
