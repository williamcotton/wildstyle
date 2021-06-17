# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'users#update', type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/users/#{user.id}", payload
  end

  describe 'basic update' do
    let!(:user) { create(:user) }

    let(:payload) do
      {
        data: {
          id: user.id.to_s,
          type: 'users',
          attributes: {
            name: 'new name'
          }
        }
      }
    end

    it 'updates the resource' do
      expect(UserResource).to receive(:find).and_call_original
      expect do
        make_request
        expect(response.status).to eq(200), response.body
      end.to change { user.reload.attributes }
    end
  end
end
