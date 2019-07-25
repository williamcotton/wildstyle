# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    title { 'MyString' }
    body { 'MyString' }
    user { create(:user) }
    product { create(:product) }
  end
end
