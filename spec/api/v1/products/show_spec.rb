require 'rails_helper'

RSpec.describe "products#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/products/#{product.id}", params: params
  end

  describe 'basic fetch' do
    let!(:product) { create(:product) }

    it 'works' do
      expect(ProductResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('products')
      expect(d.id).to eq(product.id)
    end
  end
end
