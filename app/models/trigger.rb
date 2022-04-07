class Trigger < ApplicationRecord
    belongs_to :user

    validates :user_id, uniqueness: {scope: :trigger}
end
