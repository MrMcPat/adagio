class CreateReplies < ActiveRecord::Migration[6.1]
  def change
    create_table :replies do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.integer :post_id
      t.string :comment

      t.timestamps
    end
  end
end
