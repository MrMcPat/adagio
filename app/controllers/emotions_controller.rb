class EmotionsController < ApplicationController
    def index
        render json: Emotion.all
    end

    def show
        render json: Emotion.find(params[:id])
    end

    def create
        render json: Emotion.create!(params.permit(:user_id, :color, :emotion)), status: :created
    end

    def destroy
        Emotion.find(params[:id]).destroy
        head :no_content
    end
end
