# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    title { Faker::Music::GratefulDead.song }
    description { Faker::Quote.famous_last_words }
    image_url { 'MyString' }
  end
end
