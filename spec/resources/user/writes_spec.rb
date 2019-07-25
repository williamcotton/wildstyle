# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'users',
          attributes: attributes_for(:user)
        }
      }
    end

    let(:instance) do
      UserResource.build(payload)
    end

    it 'works' do
      expect do
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      end.to change { User.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:user) { create(:user) }

    let(:payload) do
      {
        data: {
          id: user.id.to_s,
          type: 'users',
          attributes: {
            name: 'new'
          }
        }
      }
    end

    let(:instance) do
      UserResource.find(payload)
    end

    it 'works (add some attributes and enable this spec)' do
      expect do
        expect(instance.update_attributes).to eq(true)
      end.to change { user.reload.updated_at }
        .and change { user.name }.to('new')
    end
  end

  describe 'destroying' do
    let!(:user) { create(:user) }

    let(:instance) do
      UserResource.find(id: user.id)
    end

    it 'works' do
      expect do
        expect(instance.destroy).to eq(true)
      end.to change { User.count }.by(-1)
    end
  end
end
