# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_18_185840) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "books", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name", default: "", null: false
    t.string "publisher_name", default: "", null: false
    t.date "publication_date", null: false
    t.string "abbreviation", default: "", null: false
    t.string "slug", default: "", null: false
  end

  create_table "spells", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name", default: "", null: false
    t.string "casting_time", default: "", null: false
    t.string "description", default: "", null: false
    t.string "duration", default: "", null: false
    t.integer "level", null: false
    t.string "material_component", default: "", null: false
    t.string "range", default: "", null: false
    t.boolean "ritual", default: false, null: false
    t.string "school", default: "", null: false
    t.string "short_description", default: "", null: false
    t.string "slug", default: "", null: false
    t.boolean "somatic_component", default: false, null: false
    t.boolean "verbal_component", default: false, null: false
  end

end
