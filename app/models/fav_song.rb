class FavSong < ApplicationRecord
    belongs_to :emotion

    validates :emotion_id, presence: true, uniqueness: {scope: :spotify_uri}
end
