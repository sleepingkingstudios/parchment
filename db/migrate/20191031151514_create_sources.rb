# frozen_string_literal: true

class CreateSources < ActiveRecord::Migration[6.0]
  def change
    create_table :sources, id: :uuid do |t|
      t.timestamps

      t.jsonb :metadata
    end

    add_reference :sources,
      :origin,
      polymorphic: true,
      type:        :uuid

    add_reference :sources,
      :reference,
      index:       { unique: true },
      polymorphic: true,
      type:        :uuid
  end
end
