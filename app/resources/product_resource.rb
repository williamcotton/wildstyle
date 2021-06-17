# frozen_string_literal: true

class ProductResource < ApplicationResource
  attribute :title, :string
  attribute :description, :string
  attribute :image_url, :string

  has_many :reviews
end
