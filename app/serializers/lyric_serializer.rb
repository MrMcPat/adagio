class LyricSerializer < ActiveModel::Serializer
  attributes :id, :lyric, :artist_name, :song_name, :spotify_uri, :date_of_lyric
end
