# frozen_string_literal: true

class CreateMechanics < ActiveRecord::Migration[6.0]
  def change
    create_table :mechanics, id: :uuid do |t|
      t.timestamps

      t.string :type
      t.string :name,              null: false, default: ''
      t.text   :description,       null: false, default: ''
      t.string :short_description, null: false, default: ''
      t.text   :notes,             null: false, default: ''
    end
  end
end
