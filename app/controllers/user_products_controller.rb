class UserProductsController < ApplicationController


    def index
        user_products = @current_user.user_products
        render json: user_products
    end

    def create
        user_product = @current_user.user_products.create!(user_product_params)
        render json: user_product, status: :created
    end

    private

    def user_product_params
        params.permit(:user_id, :product_id, :quantity)
    end

end
