# frozen_string_literal: true

class CreateLanguages < ActiveRecord::Migration[6.0]
  def change
    create_table :languages, id: :uuid do |t|
      t.timestamps

      t.string :name,     null: false, default: ''
      t.string :rarity,   null: false, default: ''
      t.string :slug,     null: false, default: ''
      t.string :script,   null: false, default: ''
      t.string :speakers, null: false, default: ''
    end

    change_table :languages do
      add_reference :languages,
        :parent_language,
        index: false,
        type:  :uuid
    end
  end
end
