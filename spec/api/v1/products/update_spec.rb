require 'rails_helper'

RSpec.describe "products#update", type: :request do
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
            # ... your attrs here
          }
        }
      }
    end

    # Replace 'xit' with 'it' after adding attributes
    xit 'updates the resource' do
      expect(ProductResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { product.reload.attributes }
    end
  end
end
