# frozen_string_literal: true

require 'rails_helper'

RSpec.describe HelpfulReview, type: :model do
  it { is_expected.to belong_to(:review) }
  it { is_expected.to belong_to(:user) }
end
