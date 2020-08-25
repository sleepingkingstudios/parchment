# frozen_string_literal: true

class CreateSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :skills, id: :uuid do |t|
      t.timestamps

      t.string :ability_score,     null: false, default: ''
      t.text   :description,       null: false, default: ''
      t.string :name,              null: false, default: ''
      t.string :short_description, null: false, default: ''
      t.string :slug,              null: false, default: ''
    end
  end
end
