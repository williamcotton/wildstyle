# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'products#update', type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/products/#{product.id}", payload
  end

  describe 'basic update' do
    let!(:product) { create(:product) }

    let(:payload) do
      {
        data: {
          id: product.id.to_s,
          type: 'products',
          attributes: {
            description: 'description'
          }
        }
      }
    end

    it 'updates the resource' do
      expect(ProductResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change { product.reload.attributes }
    end
  end
end
