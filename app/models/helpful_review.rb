# frozen_string_literal: true

class HelpfulReview < ApplicationRecord
  belongs_to :user
  belongs_to :review
end
