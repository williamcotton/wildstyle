require 'rails_helper'

RSpec.describe "reviews#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/reviews/#{review.id}", params: params
  end

  describe 'basic fetch' do
    let!(:review) { create(:review) }

    it 'works' do
      expect(ReviewResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('reviews')
      expect(d.id).to eq(review.id)
    end
  end
end
