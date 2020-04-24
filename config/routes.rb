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
    get "#{resource_name}/create",     to: 'client#index'
    get "#{resource_name}/:id/update", to: 'client#index'
    get "#{resource_name}/:id",        to: 'client#index'
    get "#{resource_name}",            to: 'client#index'
  end

  namespace :api do
    namespace :authentication do
      resource :session, format: :json, only: %i[show]
    end

    api_resources :books

    namespace :mechanics do
      api_resources :actions
    end

    api_resources :origins, only: :index

    api_resources :spells
  end

  client_resources :books

  resources :mechanics, only: [] do
    collection do
      client_resources :actions
    end
  end

  client_resources :spells

  root to: 'client#index'
end
