class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :body, :created_at, :updated_at

  belongs_to :user
end
