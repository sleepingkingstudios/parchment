# frozen_string_literal: true

require_relative '20190901034500_create_publications'

class DropPublications < ActiveRecord::Migration[6.0]
  def change
    revert CreatePublications

    remove_column :spells, :source_id,   :uuid
    remove_column :spells, :source_type, :string
  end
end
