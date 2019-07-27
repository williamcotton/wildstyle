# frozen_string_literal: true

require 'rails_helper'

feature 'product pages', :js do
  given!(:products) { create_list(:product, 3) }
  given(:product) { products.first }

  feature 'visiting /products' do
    background do
      visit '/products'
    end

    scenario 'has a list of products' do
      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end
  end

  feature 'visiting /products/edit/:id' do
    background do
      visit "/products/edit/#{product.id}"
    end

    scenario 'shows the product details' do
      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end
  end

  feature 'visiting /products/:id' do
    background do
      visit "/products/#{product.id}"
    end

    scenario 'shows the product details' do
      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end

    context 'with a review' do
      let!(:review) { create(:review) }

      scenario 'shows the review details' do
        expect(page).to have_content review.title
        expect(page).to have_content review.body
      end
    end

    context 'when submitting a new review' do
      let(:review) { attributes_for(:review) }
      let(:title) { review[:title] }
      let(:body) { review[:body] }

      scenario 'refreshes with new the review', :js do
        within('form') do
          fill_in 'title', with: title
          fill_in 'body', with: body

          puts review[:body]

          page.save_screenshot('product-review-form.png')

          click_button 'Submit'
        end

        page.save_screenshot('product-review-form-after-submit.png')

        expect(page).to have_content title
        expect(Review.last.title).to eq title
      end
    end
  end
end
