# frozen_string_literal: true

class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books, id: :uuid do |t|
      t.timestamps

      t.string :name,             null: false, default: ''
      t.string :publisher_name,   null: false, default: ''
      t.date   :publication_date, null: false
      t.string :abbreviation,     null: false, default: ''
      t.string :slug,             null: false, default: ''
    end
  end
end
