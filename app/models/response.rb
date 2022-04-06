class Response < ApplicationRecord
    belongs_to :user
    belongs_to :lyric

    validates :response, presence: true, length: { maximum: 100 }
end
