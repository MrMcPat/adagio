class LyricsController < ApplicationController

    def index
        render json: Lyric.all
    end

    def show
        render json: Lyric.find(params[:id])
    end

    def create
        render json: Lyric.create(params.permit(:lyric, :artist_name, :song_name)), status: :created
    end
end
