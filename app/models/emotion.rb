class Emotion < ApplicationRecord
    belongs_to :user
    has_many :fav_songs

    validates :user_id, presence: true, uniqueness: {scope: [:color, :emotion]}
end
