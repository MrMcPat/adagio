class RepliesController < ApplicationController
    def index
        render json: Reply.all.order(created_at: :desc)
    end

    def show
        render json: Reply.find(params[:id])
    end

    def create
        render json: Reply.create(reply_params), status: :created
    end

    def update
        reply = Reply.find(params[:id])
        reply.update!(reply_params)
        render json: reply
    end

    def destroy
        Reply.find(params[:id]).destroy
        head :no_content
    end

    private

    def reply_params
        params.permit(:user_id, :post_id, :comment)
    end
end
