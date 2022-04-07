class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :profile_picture, :description, :journal_is_private, :favorite_songs_is_private, :allow_email, :email

  has_many :emotions
  has_many :triggers
end
