# frozen_string_literal: true

class ReviewResource < ApplicationResource
  attribute :title, :string
  attribute :body, :string
  attribute :product_id, :integer
  attribute :user_id, :integer

  belongs_to :user
  belongs_to :product

  before_save do |model|
    model.user_id = 1 unless model.user
  end
end
