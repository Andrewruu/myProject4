class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    
    def create

        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created

    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user

    end


    private

    def user_params
        params.permit(:name, :username, :password, :fund)
    end


end
