# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    title { Faker::TvShows::Simpsons.location }
    body { Faker::TvShows::Simpsons.quote }
    user { create(:user) }
    product { create(:product) }
  end
end
