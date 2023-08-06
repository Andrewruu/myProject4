class ProductsController < ApplicationController

    def index
        render json: Product.all
    end


    def create
        product = Product.create!(prodcut_params)
        render json: product, status: :created
    end

    def users_orders
        product = Product.find_by(id: params[:id])
        if product.nil?
            render json: {error: "Product Not Found"}, status: :not_found
        else
            users = product.users.distinct
            render json: users, status: :ok
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

    def prodcut_params
        params.require(:product).permit(:name, :price, :description, :image)
    end

end