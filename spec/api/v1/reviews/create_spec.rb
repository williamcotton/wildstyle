# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'reviews#create', type: :request do
  subject(:make_request) do
    jsonapi_post '/api/v1/reviews', payload
  end

  describe 'basic create' do
    let(:user) { create(:user) }
    let(:product) { create(:product) }
    let(:payload) do
      {
        data: {
          type: 'reviews',
          attributes: {
            title: 'Test',
            body: 'testing'
          },
          relationships: {
            user: {
              data: {
                type: 'user',
                id: user.id
              }
            },
            product: {
              data: {
                type: 'product',
                id: product.id
              }
            }
          }
        }
      }
    end

    it 'works' do
      expect(ReviewResource).to receive(:build).and_call_original
      expect do
        make_request
        expect(response.status).to eq(201), response.body
      end.to change { Review.count }.by(1)
    end
  end
end
