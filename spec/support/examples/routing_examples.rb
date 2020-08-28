# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'

module Spec::Support::Examples
  module RoutingExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_examples 'should route to API resource' do |resource_name, only: nil|
      root_route      = "api/#{resource_name}"
      controller_name =
        "Api::#{resource_name.split('/').map(&:classify).join('::')}"
      expected_routes = %i[
        index
        create
        show
        update
        destroy
      ]
      expected_routes &= Array(only).map(&:intern) unless Array(only).empty?

      let(:controller) do
        defined?(super()) ? super() : root_route
      end
      let(:resource_id) do
        defined?(super()) ? super() : '00000000-0000-0000-0000-000000000000'
      end

      describe "GET /#{root_route}" do
        if expected_routes.include?(:index)
          it "should route to #{controller_name}#index" do
            expect(get: "/#{root_route}.json").to route_to(
              controller: controller,
              action:     'index',
              format:     'json'
            )
          end
        else
          # :nocov:
          it 'should not be routeable' do
            expect(get: "/#{root_route}.json").not_to be_routable
          end
          # :nocov:
        end
      end

      describe "POST /#{root_route}" do
        if expected_routes.include?(:create)
          it "should route to #{controller_name}#create" do
            expect(post: "/#{root_route}.json").to route_to(
              controller: controller,
              action:     'create',
              format:     'json'
            )
          end
        else
          it 'should not be routeable' do
            expect(post: "/#{root_route}.json").not_to be_routable
          end
        end
      end

      describe "GET /#{root_route}/:id" do
        if expected_routes.include?(:show)
          it "should route to #{controller_name}#show" do
            expect(get: "/#{root_route}/#{resource_id}.json").to route_to(
              controller: controller,
              action:     'show',
              id:         resource_id,
              format:     'json'
            )
          end
        else
          it 'should not be routeable' do
            expect(get: "/#{root_route}/#{resource_id}.json").not_to be_routable
          end
        end
      end

      describe "PATCH /#{root_route}/:id" do
        if expected_routes.include?(:update)
          it "should route to #{controller_name}#update" do
            expect(patch: "/#{root_route}/#{resource_id}.json").to route_to(
              controller: controller,
              action:     'update',
              id:         resource_id,
              format:     'json'
            )
          end
        else
          it 'should not be routeable' do
            expect(patch: "/#{root_route}/#{resource_id}.json")
              .not_to be_routable
          end
        end
      end

      describe "DELETE /#{root_route}/:id" do
        if expected_routes.include?(:destroy)
          it "should route to #{controller_name}#destroy" do
            expect(delete: "/#{root_route}/#{resource_id}.json").to route_to(
              controller: controller,
              action:     'destroy',
              id:         resource_id,
              format:     'json'
            )
          end
        else
          it 'should not be routeable' do
            expect(delete: "/#{root_route}/#{resource_id}.json")
              .not_to be_routable
          end
        end
      end
    end

    shared_examples 'should route to Client resource' \
    do |resource_name, only: nil|
      root_route      = resource_name
      expected_routes = %i[
        index
        new
        show
        edit
      ]
      expected_routes &= Array(only).map(&:intern) unless Array(only).empty?

      let(:controller) { 'client' }
      let(:resource_id) do
        defined?(super()) ? super() : '00000000-0000-0000-0000-000000000000'
      end

      describe "GET /#{root_route}" do
        if expected_routes.include?(:index)
          it 'should route to ClientController#index' do
            expect(get: "/#{root_route}").to route_to(
              controller: controller,
              action:     'index'
            )
          end
        else
          # :nocov:
          it 'should not be routeable' do
            expect(get: "/#{root_route}").not_to be_routable
          end
          # :nocov:
        end
      end

      describe "GET /#{root_route}/create" do
        # rubocop:disable RSpec/RepeatedDescription
        if expected_routes.include?(:new)
          it 'should route to ClientController#index' do
            expect(get: "/#{root_route}/create").to route_to(
              controller: controller,
              action:     'index'
            )
          end
        elsif expected_routes.include?(:show)
          it 'should route to ClientController#index' do
            expect(get: "/#{root_route}/#{resource_id}").to route_to(
              controller: controller,
              action:     'index',
              id:         resource_id
            )
          end
        else
          # :nocov:
          it 'should not be routeable' do
            expect(get: "/#{root_route}/create").not_to be_routable
          end
          # :nocov:
        end
        # rubocop:enable RSpec/RepeatedDescription
      end

      describe "GET /#{root_route}/:id" do
        if expected_routes.include?(:show)
          it 'should route to ClientController#index' do
            expect(get: "/#{root_route}/#{resource_id}").to route_to(
              controller: controller,
              action:     'index',
              id:         resource_id
            )
          end
        else
          # :nocov:
          it 'should not be routeable' do
            expect(get: "/#{root_route}/#{resource_id}").not_to be_routable
          end
          # :nocov:
        end
      end

      describe "GET /#{root_route}/:id/update" do
        if expected_routes.include?(:edit)
          it 'should route to ClientController#index' do
            expect(get: "/#{root_route}/#{resource_id}/update").to route_to(
              controller: controller,
              action:     'index',
              id:         resource_id
            )
          end
        else
          it 'should not be routeable' do
            expect(get: "/#{root_route}/#{resource_id}/update")
              .not_to be_routable
          end
        end
      end
    end
  end
end
