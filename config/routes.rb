Rails.application.routes.draw do
  resources :products, only: [:index]

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch '/users/:id', to: 'users#update'
  delete "remove-user/:id", to: 'users#destroy'

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/add-product", to: "products#create"
  delete "/remove-product/:id", to: "products#destroy"
  patch '/edit-product/:id', to: "products#update"

  post "/new-order", to: "user_products#create"
  get "/orders", to: "user_products#index"
  delete "/order-refund/:id", to: "user_products#destroy"
  patch '/edit-order/:id', to: "user_products#update"

end
