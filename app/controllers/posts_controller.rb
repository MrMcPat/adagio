class PostsController < ApplicationController
    def index
        render json: Post.all.order(created_at: :desc)
    end

    def show
        render json: Post.find(params[:id])
    end

    def create
        render json: Post.create(post_params), status: :created
    end

    def update
        post = Post.find(params[:id])
        post.update!(post_params)
        render json: post
    end

    def destroy
        Post.find(params[:id]).destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:user_id, :title, :body)
    end
end
