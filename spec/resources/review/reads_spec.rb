require 'rails_helper'

RSpec.describe ReviewResource, type: :resource do
  describe 'serialization' do
    let!(:review) { create(:review) }

    it 'works' do
      render
      data = jsonapi_data[0]
      expect(data.id).to eq(review.id)
      expect(data.jsonapi_type).to eq('reviews')
    end
  end

  describe 'filtering' do
    let!(:review1) { create(:review) }
    let!(:review2) { create(:review) }

    context 'by id' do
      before do
        params[:filter] = { id: { eq: review2.id } }
      end

      it 'works' do
        render
        expect(d.map(&:id)).to eq([review2.id])
      end
    end
  end

  describe 'sorting' do
    describe 'by id' do
      let!(:review1) { create(:review) }
      let!(:review2) { create(:review) }

      context 'when ascending' do
        before do
          params[:sort] = 'id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            review1.id,
            review2.id
          ])
        end
      end

      context 'when descending' do
        before do
          params[:sort] = '-id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            review2.id,
            review1.id
          ])
        end
      end
    end
  end

  describe 'sideloading' do
    # ... your tests ...
  end
end
