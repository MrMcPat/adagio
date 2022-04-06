class ResponsesController < ApplicationController
    def index
        render json: Response.all
    end

    def show
        render json: Response.find(params[:id])
    end

    def create
        response = Response.create!(params.permit(:user_id, :lyric_id, :color, :response))
        render json: response, status: :created
    end
end
