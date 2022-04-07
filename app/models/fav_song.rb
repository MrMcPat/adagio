class FavSong < ApplicationRecord
    belongs_to :emotion

    validates :spotify_uri, uniqueness: true
end
