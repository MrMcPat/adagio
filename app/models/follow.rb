class Follow < ApplicationRecord
    belongs_to :user

    validates :user_id, uniqueness: {scope: :followed_user_id}
end
