class ProductsController < ApplicationController

    def index
        render json: Product.all
    end

    def create
        product = @current_user.prodcut.create!(product_params)
        render json: product, status: :created
    end

    private

    def prodcut_params
        params.permit(:name, :price, :description, :image)
    end

end