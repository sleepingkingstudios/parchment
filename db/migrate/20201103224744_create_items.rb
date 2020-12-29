# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items, id: :uuid do |t|
      t.timestamps

      t.string :type
      t.string :name,        null: false, default: ''
      t.string :slug,        null: false, default: ''
      t.string :cost,        null: false, default: ''
      t.text   :description, null: false, default: ''
      t.jsonb  :data,        null: false, default: {}
    end
  end
end
