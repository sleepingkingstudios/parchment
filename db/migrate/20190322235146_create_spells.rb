# frozen_string_literal: true

class CreateSpells < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')

    create_table :spells, id: :uuid do |t|
      t.timestamps

      t.string  :name,         null: false, default: ''
      t.string  :casting_time, null: false, default: ''
      t.string  :description,  null: false, default: ''
      t.string  :duration,     null: false, default: ''
      t.integer :level,        null: false
      t.string  :range,        null: false, default: ''
      t.boolean :ritual,       null: false, default: false
      t.string  :school,       null: false, default: ''

      t.string  :material_component, null: false, default: ''
      t.boolean :somatic_component,  null: false, default: false
      t.boolean :verbal_component,   null: false, default: false
    end
  end
end
