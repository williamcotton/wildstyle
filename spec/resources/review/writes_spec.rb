# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReviewResource, type: :resource do
  describe 'creating' do
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

    let(:instance) do
      ReviewResource.build(payload)
    end

    it 'works' do
      expect do
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      end.to change { Review.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:review) { create(:review) }

    let(:payload) do
      {
        data: {
          id: review.id.to_s,
          type: 'reviews',
          attributes: {
            body: 'another body'
          }
        }
      }
    end

    let(:instance) do
      ReviewResource.find(payload)
    end

    it 'works (add some attributes and enable this spec)' do
      expect do
        expect(instance.update_attributes).to eq(true)
      end.to change { review.reload.updated_at }
        .and change { review.body }.to('another body')
    end
  end

  describe 'destroying' do
    let!(:review) { create(:review) }

    let(:instance) do
      ReviewResource.find(id: review.id)
    end

    it 'works' do
      expect do
        expect(instance.destroy).to eq(true)
      end.to change { Review.count }.by(-1)
    end
  end
end
