class FavSongSerializer < ActiveModel::Serializer
  attributes :id, :emotion_id, :song_name, :artist_name, :spotify_uri
end
