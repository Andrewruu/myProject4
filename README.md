## Description

This is the phase 4 project where it will demonstrate at many to many relationship with a join table.
In this project we will be using Users, Products, and User_products
User_products are the orders that Users will make on Products
Users --< User_products >-- Products
So users will have many user_products and have many products through user_products
Products will have many user_products and have many users through user_products
This project also shows authorization and authentication in action allowing users to Login and save a sesssion using cookies.

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
