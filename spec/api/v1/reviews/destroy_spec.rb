require 'rails_helper'

RSpec.describe "reviews#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/reviews/#{review.id}"
  end

  describe 'basic destroy' do
    let!(:review) { create(:review) }

    it 'updates the resource' do
      expect(ReviewResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Review.count }.by(-1)
      expect { review.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
