require 'rails_helper'

RSpec.describe "products#create", type: :request do
  subject(:make_request) do
    jsonapi_post "/api/v1/products", payload
  end

  describe 'basic create' do
    let(:params) do
      attributes_for(:product)
    end
    let(:payload) do
      {
        data: {
          type: 'products',
          attributes: params
        }
      }
    end

    it 'works' do
      expect(ProductResource).to receive(:build).and_call_original
      expect {
        make_request
        expect(response.status).to eq(201), response.body
      }.to change { Product.count }.by(1)
    end
  end
end
