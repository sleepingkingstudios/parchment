# frozen_string_literal: true

class AddPlaytestToBooks < ActiveRecord::Migration[6.0]
  def change
    change_table :books do |t|
      t.boolean :playtest, default: false, null: false
      t.rename :name, :title
    end
  end
end
