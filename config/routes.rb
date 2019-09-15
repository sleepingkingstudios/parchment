# frozen_string_literal: true

Rails.application.routes.draw do
  # See https://guides.rubyonrails.org/routing.html

  def self.api_resources(resource_name, **options, &block)
    resources(
      resource_name,
      options.reverse_merge(
        format: :json,
        only:   %i[index create show update destroy]
      ),
      &block
    )
  end

  def self.client_resources(resource_name)
    get "#{resource_name}/create", to: 'client#index'
    get "#{resource_name}/:id/update", to: 'client#index'
    get "#{resource_name}/:id", to: 'client#index'
    get "#{resource_name}", to: 'client#index'
  end

  namespace :api do
    api_resources :publications
    api_resources :spells do
      collection do
        api_resources :sources,
          as:         'spell_sources',
          controller: 'spells/sources',
          only:       :index
      end
    end
  end

  client_resources :publications
  client_resources :spells

  root to: 'client#index'
end
