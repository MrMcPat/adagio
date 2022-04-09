class JournalEntrySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :body, :is_private, :heart_count, :praying_count, :shocked_count, :sad_count, :created_at, :updated_at

  belongs_to :user
end
