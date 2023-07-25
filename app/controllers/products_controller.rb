class ProductsController < ApplicationController

    def index
        render json: Product.all
    end

    private

    def prodcut_params
        params.permit(:name, :price, :description, :image)
    end

end