# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    title { 'MyString' }
    body { 'MyString' }
    user { nil }
    product { nil }
  end
end
