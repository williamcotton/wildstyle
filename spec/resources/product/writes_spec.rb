# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ProductResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'products',
          attributes: attributes_for(:product)
        }
      }
    end

    let(:instance) do
      ProductResource.build(payload)
    end

    it 'works' do
      expect do
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      end.to change { Product.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:product) { create(:product) }

    let(:payload) do
      {
        data: {
          id: product.id.to_s,
          type: 'products',
          attributes: {
            title: 'test'
          }
        }
      }
    end

    let(:instance) do
      ProductResource.find(payload)
    end

    it 'works (add some attributes and enable this spec)' do
      expect do
        expect(instance.update_attributes).to eq(true)
      end.to change { product.reload.updated_at }
        .and change { product.title }.to('test')
    end
  end

  describe 'destroying' do
    let!(:product) { create(:product) }

    let(:instance) do
      ProductResource.find(id: product.id)
    end

    it 'works' do
      expect do
        expect(instance.destroy).to eq(true)
      end.to change { Product.count }.by(-1)
    end
  end
end
