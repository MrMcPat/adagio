class CreateJournalEntries < ActiveRecord::Migration[6.1]
  def change
    create_table :journal_entries do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.string :title
      t.string :body
      t.boolean :is_private
      t.integer :heart_count
      t.integer :praying_count
      t.integer :shocked_count
      t.integer :sad_count

      t.timestamps
    end
  end
end
