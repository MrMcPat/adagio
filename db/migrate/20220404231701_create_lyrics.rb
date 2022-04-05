class CreateLyrics < ActiveRecord::Migration[6.1]
  def change
    create_table :lyrics do |t|
      t.string :lyric
      t.string :artist_name
      t.string :song_name
      t.string :date_of_lyric
      t.string :spotify_uri

      t.timestamps
    end
  end
end
