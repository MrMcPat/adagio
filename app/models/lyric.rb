class Lyric < ApplicationRecord
    has_many :responses
    has_many :users, through: :responses

    # def self.today
    #     where(:created_at => (Time.zone.now.beginning_of_day..Time.zone.now)).all.any?
    #   end

end
