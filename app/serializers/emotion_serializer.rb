class EmotionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :color, :emotion

  has_many :fav_songs
end
