# frozen_string_literal: true

class ReviewResource < ApplicationResource
  attribute :title, :string
  attribute :body, :string

  belongs_to :user
  belongs_to :product
end
