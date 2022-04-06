class FavSongsController < ApplicationController
    def index
        render json: FavSong.all
    end

    def show
        render json: FavSong.find(params[:id])
    end

    def create
        render json: FavSong.create(params.permit(:emotion_id, :song_name, :artist_name, :spotify_uri)), status: :created
    end

    def destroy
        FavSong.find(params[:id]).destroy
        head :no_content
    end
end
