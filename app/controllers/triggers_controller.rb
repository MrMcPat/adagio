class TriggersController < ApplicationController
    def index
        render json: Trigger.all
    end

    def show
        render json: Trigger.find(params[:id])
    end

    def create
        render json: Trigger.create!(params.permit(:user_id, :trigger)), status: :created
    end

    def destroy
        Trigger.find(params[:id]).destroy
        head :no_content
    end
end
