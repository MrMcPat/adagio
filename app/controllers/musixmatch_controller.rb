require 'net/http'
require 'uri'
require 'json'

class MusixmatchController < ApplicationController

    def musixsongs 
        url = URI("https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=#{params[:emotion]}&page_size=10&page=#{params[:page]}&s_track_rating=desc&f_music_genre_id&apikey=#{params[:apikey]}")
    
        https = Net::HTTP.new(url.host, url.port)
        https.use_ssl = true
    
        request = Net::HTTP::Get.new(url)
    
        response = https.request(request)
        JSON.parse(response.body)
        render json: response.body
    end

end
