# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_13_151242) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "emotions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "color"
    t.string "emotion"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "fav_songs", force: :cascade do |t|
    t.integer "emotion_id"
    t.string "song_name"
    t.string "artist_name"
    t.string "spotify_uri"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "follows", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "followed_user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "journal_entries", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "title"
    t.text "body"
    t.boolean "is_private"
    t.integer "heart_count"
    t.integer "praying_count"
    t.integer "shocked_count"
    t.integer "sad_count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "lyrics", force: :cascade do |t|
    t.string "lyric"
    t.string "artist_name"
    t.string "song_name"
    t.string "date_of_lyric"
    t.string "spotify_uri"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "posts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "title"
    t.string "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "replies", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "post_id"
    t.string "comment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "responses", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "lyric_id"
    t.string "color"
    t.string "emotion"
    t.string "response"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "triggers", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "trigger"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "profile_picture"
    t.string "description"
    t.boolean "journal_is_private"
    t.boolean "favorite_songs_is_private"
    t.boolean "allow_email"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
