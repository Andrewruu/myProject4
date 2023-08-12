class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create] 
    
    def create

        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created

    end

    def show
      current_user = User.find(session[:user_id])
      render json: current_user

    end

    def update
        user = User.find(params[:id])
        if user.update(user_params_update)
          render json: user, status: :ok
        else
          render json: { error: 'Failed to update user fund' }, status: :unprocessable_entity
        end
    end

    def destroy
      user = User.find(params[:id])
    
      if user.nil?
        render json: {error: "User Not found"}, status: :not_found
      else
        user.user_products.destroy_all
        user.destroy
        render json: {message: "User deleted"}, status: :ok
    end
    
    end




    private

    def user_params
        params.permit(:name, :username, :password, :fund)
    end

    def user_params_update
        params.require(:user).permit(:name, :username, :password, :fund)
    end

end
