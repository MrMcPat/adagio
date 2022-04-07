class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :lyric_id, :color, :emotion, :response, :created_at

  belongs_to :user
end
