class CreateTriggers < ActiveRecord::Migration[6.1]
  def change
    create_table :triggers do |t|
      t.integer :user_id,  null: false, foreign_key: true
      t.string :trigger

      t.timestamps
    end
  end
end
