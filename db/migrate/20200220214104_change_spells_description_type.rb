# frozen_string_literal: true

class ChangeSpellsDescriptionType < ActiveRecord::Migration[6.0]
  def down
    change_column :spells, :description, :string
  end

  def up
    change_column :spells, :description, :text
  end
end
