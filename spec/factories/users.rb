# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    type { '' }
    username { 'MyString' }
    email { 'MyString' }
    name { 'MyString' }
  end
end
