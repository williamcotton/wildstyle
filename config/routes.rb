# frozen_string_literal: true

Rails.application.routes.draw do
  scope path: ApplicationResource.endpoint_namespace, defaults: { format: :jsonapi } do
    resources :products
    mount VandalUi::Engine, at: '/vandal'
    # your routes go here
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
