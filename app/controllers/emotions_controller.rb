class EmotionsController < ApplicationController
    def index
        render json: Emotion.all
    end

    def show
        render json: Emotion.find(params[:id])
    end
end
