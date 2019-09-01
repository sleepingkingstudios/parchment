# frozen_string_literal: true

class CreatePublications < ActiveRecord::Migration[6.0]
  def change
    create_table :publications, id: :uuid do |t|
      t.string  :name,             null: false, default: ''
      t.string  :abbreviation,     null: false
      t.boolean :playtest,         null: false
      t.date    :publication_date, null: false
      t.string  :publisher_name,   null: false, default: ''
      t.string  :slug,             null: false

      t.timestamps
    end
  end
end
