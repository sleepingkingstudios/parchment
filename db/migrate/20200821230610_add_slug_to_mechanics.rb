# frozen_string_literal: true

class AddSlugToMechanics < ActiveRecord::Migration[6.0]
  def change
    add_column :mechanics, :data, :jsonb
    add_column :mechanics, :slug, :string, null: false, default: ''
  end
end
