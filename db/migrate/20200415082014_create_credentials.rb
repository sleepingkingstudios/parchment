# frozen_string_literal: true

class CreateCredentials < ActiveRecord::Migration[6.0]
  def change
    create_table :credentials, id: :uuid do |t|
      t.timestamps

      t.boolean  :active,     null: false, default: true
      t.datetime :expires_at, null: false
      t.jsonb    :data,       null: false, default: {}
      t.string   :type
    end

    add_reference :credentials,
      :user,
      index: false,
      type:  :uuid

    add_index :credentials, %i[user_id type active]
  end
end
