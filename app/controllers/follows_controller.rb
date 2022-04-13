class FollowsController < ApplicationController
    def index
        render json: Follow.all
    end

    def show
        render json: Follow.find(params[:id])
    end

    def create
        render json: Follow.create!(params.permit(:user_id, :followed_user_id)), status: :created
    end

    def destroy
        Follow.find(params[:id]).destroy
        head :no_content
    end
end
