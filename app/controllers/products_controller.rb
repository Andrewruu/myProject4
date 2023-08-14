class ProductsController < ApplicationController
    skip_before_action :authorize, only: [:index, :create, :update, :destroy]
    def index
        render json: Product.all
    end


    def create
        product = Product.create!(product_params)
        render json: product, status: :created
    end

    def update
        product = Product.find_by(id: params[:id])
        if product.nil?
            render json: {error: "Product Not Found"}, status: :not_found
        elsif product.update(product_params)
          render json: product, status: :ok
        else
          render json: {errors: product.errors.full_messages}, status: :unprocessable_entity
        end
    end
    
    def destroy
        product = Product.find_by(id: params[:id])

        if product.nil?
            render json: {error: "Product Not found"}, status: :not_found
        else
            product.user_products.destroy_all
            product.destroy
            render json: {message: "Prodect deleted"}, status: :ok
        end
    end

    private
    
    def product_params
        params.require(:product).permit(:name, :price, :description, :image)
    end

end