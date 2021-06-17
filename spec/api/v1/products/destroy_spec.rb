require 'rails_helper'

RSpec.describe "products#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/products/#{product.id}"
  end

  describe 'basic destroy' do
    let!(:product) { create(:product) }

    it 'updates the resource' do
      expect(ProductResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Product.count }.by(-1)
      expect { product.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
