class Follow < ApplicationRecord
    belongs_to :user

    validates :followed_user_id, uniqueness: true
end
