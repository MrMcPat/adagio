class CreateFavSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :fav_songs do |t|
      t.integer :emotion_id
      t.string :song_name
      t.string :artist_name
      t.string :spotify_uri

      t.timestamps
    end
  end
end
