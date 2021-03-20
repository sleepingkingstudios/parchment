# frozen_string_literal: true

Rails.application.routes.draw do
  # See https://guides.rubyonrails.org/routing.html

  API_ROUTES    = %i[index create show update destroy]
  CLIENT_ROUTES = %i[index show new edit]

  def self.api_resources(resource_name, **options, &block)
    resources(
      resource_name,
      options.reverse_merge(
        format: :json,
        only:   API_ROUTES
      ),
      &block
    )
  end

  def self.client_resources(resource_name, **options, &block)
    options = options.reverse_merge(
      except: [],
      only:   CLIENT_ROUTES
    )
    endpoints = Set.new(options[:only] - options[:except])

    scope(resource_name, &block) if block_given?

    if endpoints.include?(:new)
      get "#{resource_name}/create", to: 'client#index'
    end

    if endpoints.include?(:edit)
      get "#{resource_name}/:id/update", to: 'client#index'
    end

    if endpoints.include?(:show)
      get "#{resource_name}/:id", to: 'client#index'
    end

    if endpoints.include?(:index)
      get "#{resource_name}", to: 'client#index'
    end
  end

  namespace :api do
    namespace :authentication do
      resource :session, format: :json, only: %i[create show]
    end

    api_resources :books

    namespace :mechanics do
      api_resources :actions

      api_resources :conditions
    end

    api_resources :origins, only: :index

    namespace :reference do
      namespace :items do
        api_resources :magic_items
      end

      api_resources :items

      api_resources :languages, only: %i[index show]

      api_resources :skills, only: %i[index show]
    end

    api_resources :spells
  end

  client_resources :books

  resources :mechanics, only: [] do
    collection do
      client_resources :actions

      client_resources :conditions
    end
  end

  scope :reference do
    client_resources :items do
      client_resources :magic_items
    end

    client_resources :languages, only: %i[index show]

    client_resources :skills, only: %i[index show]
  end

  client_resources :spells

  root to: 'client#index'
end
