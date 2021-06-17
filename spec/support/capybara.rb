# frozen_string_literal: true

require 'capybara/rspec'
require 'capybara/apparition'

# Capybara.register_driver :apparition do |app|
#   Capybara::Apparition::Driver.new(app, headless: false)
# end

Capybara.configure do |config|
  config.default_driver = :apparition
  config.javascript_driver = :apparition
  config.run_server = false
  config.app_host   = ENV['TEST_HOST']
end

Capybara.current_session.driver.header('X-Content-Type-Options', 'nosniff')

RSpec.configure do |config|
  config.append_after(:each, type: :feature) do
    Capybara.reset_sessions!
  end
end
