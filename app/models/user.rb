class User < ApplicationRecord
    has_many :emotions, dependent: :destroy
    has_many :triggers, dependent: :destroy
    has_many :responses, dependent: :destroy
    has_many :journal_entries, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :replies, dependent: :destroy
    has_many :follows, dependent: :destroy
    has_many :posts, through: :replies
    has_many :lyrics, through: :responses

    has_secure_password

    attr_accessor :old_password
  
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true, length: {maximum: 20}
    validates :first_name, length: {maximum: 30}
    validates :last_name, length: {maximum: 30}
    validates :description, length: {maximum: 250}
    
end
