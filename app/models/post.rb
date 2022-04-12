class Post < ApplicationRecord
    belongs_to :user
    has_many :replies, dependent: :destroy
    has_many :users, through: :replies
end
