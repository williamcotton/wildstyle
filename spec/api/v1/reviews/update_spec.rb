# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'reviews#update', type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/reviews/#{review.id}", payload
  end

  describe 'basic update' do
    let!(:review) { create(:review) }

    let(:payload) do
      {
        data: {
          id: review.id.to_s,
          type: 'reviews',
          attributes: {
            body: 'another'
          }
        }
      }
    end

    it 'updates the resource' do
      expect(ReviewResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change { review.reload.attributes }
    end
  end
end
