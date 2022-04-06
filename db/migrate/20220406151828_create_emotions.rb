class CreateEmotions < ActiveRecord::Migration[6.1]
  def change
    create_table :emotions do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.string :color
      t.string :emotion

      t.timestamps
    end
  end
end
