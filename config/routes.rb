# frozen_string_literal: true

Rails.application.routes.draw do
  # See https://guides.rubyonrails.org/routing.html

  def self.api_resources(resource_name, **options)
    resources(
      resource_name,
      options.reverse_merge(
        format: :json,
        only:   %i[index create show update destroy]
      )
    )
  end

  namespace :api do
    api_resources :spells
  end

  get 'spells/*path', to: 'client#index'
  get 'spells', to: 'client#index'

  root to: 'client#index'
end
