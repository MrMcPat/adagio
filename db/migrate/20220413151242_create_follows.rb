class CreateFollows < ActiveRecord::Migration[6.1]
  def change
    create_table :follows do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.integer :followed_user_id

      t.timestamps
    end
  end
end
