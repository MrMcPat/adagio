class Emotion < ApplicationRecord
    belongs_to :user
    has_many :fav_songs
end
