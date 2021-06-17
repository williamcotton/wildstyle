# frozen_string_literal: true

class LikedProduct < ApplicationRecord
  belongs_to :user
  belongs_to :product
end
