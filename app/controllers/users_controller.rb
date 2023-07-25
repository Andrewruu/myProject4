class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    
    def create

        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created

    end

    def update
        user = User.find(params[:id])
        if user.update(user_params)
          render json: user, status: :ok
        else
          render json: { error: 'Failed to update user fund' }, status: :unprocessable_entity
        end
      end

    def show

        render json: @current_user

    end


    private

    def user_params
        params.permit(:name, :username, :password, :fund)
    end


end
