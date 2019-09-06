# frozen_string_literal: true

class AddSourceToSpells < ActiveRecord::Migration[6.0]
  def change
    change_table :spells do |t|
      t.uuid   :source_id
      t.string :source_type
      t.string :short_description, null: false, default: ''
      t.string :slug,              null: false, default: ''
    end
  end
end
