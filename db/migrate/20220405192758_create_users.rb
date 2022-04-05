class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :profile_picture
      t.boolean :journal_is_private
      t.boolean :favorite_songs_is_private
      t.boolean :allow_email
      t.string :email
      t.string :password_digest

      t.timestamps
    end
  end
end
