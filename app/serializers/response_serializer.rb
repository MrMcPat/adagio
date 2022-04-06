class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :lyric_id, :color, :response, :created_at
end
