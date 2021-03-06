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
      sleep 0.5

      page.save_screenshot('products.png')

      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end
  end

  feature 'visiting /products/:id/edit' do
    background do
      visit "/products/#{product.id}/edit"
    end

    scenario 'shows the product details' do
      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end
  end

  feature 'visiting /products/:id' do
    let!(:review) { create(:review, product: product) }

    background do
      # Faker::Config.random = Random.new(420)
      visit "/products/#{product.id}"
    end

    scenario 'shows the product details' do
      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end

    context 'with a review' do
      scenario 'shows the review details' do
        page.save_screenshot('product-review.png')

        expect(page).to have_content review.title
        expect(page).to have_content review.body
      end
    end
  end

  feature 'visiting /products/:id and submitting a review' do
    let!(:review) { create(:review, product: product) }
    let(:title) { Faker::TvShows::Simpsons.location }
    let(:body) { Faker::TvShows::Simpsons.quote }

    background do
      # Faker::Config.random = Random.new(420)
      visit "/products/#{product.id}"
    end

    scenario 'updates the page with the new review', :js do
      within('form') do
        fill_in 'title', with: title
        sleep 0.5
        fill_in 'body', with: body

        page.save_screenshot('product-review-form.png')

        click_button 'Submit'
      end

      page.save_screenshot('product-review-form-after-submit.png')

      expect(page).to have_content title
      expect(page).to have_content body
      expect(Review.last.title).to eq title
      expect(Review.last.body).to eq body
    end
  end
end
