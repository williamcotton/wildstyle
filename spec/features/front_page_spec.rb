# frozen_string_literal: true

require 'rails_helper'

feature 'front page' do
  feature 'visiting /' do
    background do
      visit '/'
    end

    scenario 'it says hello!', :js do
      expect(page).to have_content 'hello!'
    end
  end
end
