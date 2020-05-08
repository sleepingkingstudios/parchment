# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.timestamps

      t.string :username,      null: false, default: ''
      t.string :email_address, null: false, default: ''
      t.string :role,          null: false, default: ''
    end

    add_index :users, :email_address, unique: true
    add_index :users, :username,      unique: true
  end
end
