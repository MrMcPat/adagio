class EmotionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :color, :emotion
end
