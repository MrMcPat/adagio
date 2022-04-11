class ReplySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :post_id, :comment, :created_at, :updated_at
end
