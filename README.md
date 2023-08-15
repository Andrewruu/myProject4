## Description

This is the phase 4 project where it will demonstrate at many to many relationship with a join table.
In this project we will be using Users, Products, and User_products
User_products are the orders that Users will make on Products
Users --< User_products >-- Products
So users will have many user_products and have many products through user_products
Products will have many user_products and have many users through user_products
This project also shows authorization and authentication in action allowing users to Login and save a sesssion using cookies.


```
  post "/add-product", to: "products#create"
  delete "/remove-product/:id", to: "products#destroy"
  patch '/edit-product/:id', to: "products#update"

  patch '/users/:id', to: 'users#update'
  delete "remove-user/:id", to: 'users#destroy'
```
block of paths for CRUD to meet the project requirements if using postman to test you will need to modifiy the pramas
for product it needs to me product[] and for users it needs to be users[]. Also user needs to be Authorized to use those two paths.
So if you use postman to test the routes you will need to add update and destory to skip_before_action in the users_controller file.

## Setup

fork and clone this repo 
navigate to where you cloned this and check out the setup below

Rails setup

```console
$ bundle install
$ rails db:migrate db:seed
$ rails s
```

React setup

```console
$ npm install --prefix client
$ npm start --prefix client
```


## Resources

- Images are from https://www.pexels.com/
- Bref overview of the project https://youtu.be/dPiKkZ0JRbs 
