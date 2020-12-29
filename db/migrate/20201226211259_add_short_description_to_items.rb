# frozen_string_literal: true

class AddShortDescriptionToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :short_description, :string, null: false, default: ''
  end
end
