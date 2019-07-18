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
      expect {
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      }.to change { Product.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:product) { create(:product) }

    let(:payload) do
      {
        data: {
          id: product.id.to_s,
          type: 'products',
          attributes: { } # Todo!
        }
      }
    end

    let(:instance) do
      ProductResource.find(payload)
    end

    xit 'works (add some attributes and enable this spec)' do
      expect {
        expect(instance.update_attributes).to eq(true)
      }.to change { product.reload.updated_at }
      # .and change { product.foo }.to('bar') <- example
    end
  end

  describe 'destroying' do
    let!(:product) { create(:product) }

    let(:instance) do
      ProductResource.find(id: product.id)
    end

    it 'works' do
      expect {
        expect(instance.destroy).to eq(true)
      }.to change { Product.count }.by(-1)
    end
  end
end
