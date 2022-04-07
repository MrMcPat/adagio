class CreateResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :responses do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.integer :lyric_id
      t.string :color
      t.string :emotion
      t.string :response

      t.timestamps
    end
  end
end
