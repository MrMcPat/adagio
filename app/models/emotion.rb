class Emotion < ApplicationRecord
    belongs_to :user
    has_many :fav_songs, dependent: :destroy

    validates :user_id, presence: true, uniqueness: {scope: [:color, :emotion]}
end
