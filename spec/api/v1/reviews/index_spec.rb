require 'rails_helper'

RSpec.describe "reviews#index", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/reviews", params: params
  end

  describe 'basic fetch' do
    let!(:review1) { create(:review) }
    let!(:review2) { create(:review) }

    it 'works' do
      expect(ReviewResource).to receive(:all).and_call_original
      make_request
      expect(response.status).to eq(200), response.body
      expect(d.map(&:jsonapi_type).uniq).to match_array(['reviews'])
      expect(d.map(&:id)).to match_array([review1.id, review2.id])
    end
  end
end
