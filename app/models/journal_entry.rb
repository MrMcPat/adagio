class JournalEntry < ApplicationRecord
    belongs_to :user

    validates :title, presence: true
    validates :body, presence: true
    validates :is_private, presence: true
end
