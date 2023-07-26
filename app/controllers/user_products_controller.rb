class UserProductsController < ApplicationController


    def index
        user_products = @current_user.user_products
        render json: user_products
    end

    def create
        user_product = @current_user.user_products.create!(user_product_params)
        render json: user_product, status: :created
    end

    def destroy
    
        user_product = UserProduct.find_by(id: params[:id])
        
        if user_product.nil?
            render json: {error: "Order Not found"}, status: :not_found
        elsif
            user_product.user != @current_user
            render json: {error: "Not Authorized to refund this Order!"}, status: :forbidden
        else
            user_product.destroy
            render json: {message: "User product refunded"}, status: :ok
        end

    end
    private

    def user_product_params
        params.require(:user_product).permit(:user_id, :product_id, :quantity)
    end

end
