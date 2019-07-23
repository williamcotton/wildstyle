# frozen_string_literal: true

require 'rails_helper'

feature 'product pages' do
  given!(:products) { create_list(:product, 3) }
  given(:product) { products.first }

  feature 'visiting /products' do
    background do
      visit '/products'
    end

    scenario 'has a list of products', :js do
      expect(page).to have_content products.first.title
      expect(page).to have_content products.first.description
    end
  end

  feature 'visiting /products/edit/:id' do
    background do
      visit "/products/edit/#{product.id}"
    end

    scenario 'shows the product details', :js do
      expect(page).to have_content product.title
      expect(page).to have_content product.description
    end
  end
end
