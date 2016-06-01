class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.integer :level
      t.string :race
      t.string :charclass
      t.string :zone
      t.string :guild
    end
  end
end
