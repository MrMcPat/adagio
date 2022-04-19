class User < ApplicationRecord
    has_many :emotions
    has_many :triggers
    has_many :responses
    has_many :journal_entries
    has_many :posts
    has_many :replies
    has_many :follows
    has_many :posts, through: :replies
    has_many :lyrics, through: :responses

    has_secure_password

    attr_accessor :old_password
  
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true, length: {maximum: 20}
    validates :description, length: {maximum: 100}
    
end
