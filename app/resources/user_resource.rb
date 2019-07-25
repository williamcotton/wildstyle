# frozen_string_literal: true

class UserResource < ApplicationResource
  attribute :username, :string
  attribute :type, :string
  attribute :email, :string
  attribute :name, :string

  has_many :reviews
end
