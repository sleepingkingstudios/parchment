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

      if expected_routes.include?(:index)
        describe "GET /#{root_route}" do
          it "should route to #{controller_name}#index" do
            expect(get: "/#{root_route}.json").to route_to(
              controller: controller,
              action:     'index',
              format:     'json'
            )
          end
        end
      end

      if expected_routes.include?(:create)
        describe "POST /#{root_route}" do
          it "should route to #{controller_name}#create" do
            expect(post: "/#{root_route}.json").to route_to(
              controller: controller,
              action:     'create',
              format:     'json'
            )
          end
        end
      end

      if expected_routes.include?(:show)
        describe "GET /#{root_route}/:id" do
          it "should route to #{controller_name}#show" do
            expect(get: "/#{root_route}/#{resource_id}.json").to route_to(
              controller: controller,
              action:     'show',
              id:         resource_id,
              format:     'json'
            )
          end
        end
      end

      if expected_routes.include?(:update)
        describe "PATCH /#{root_route}/:id" do
          it "should route to #{controller_name}#update" do
            expect(patch: "/#{root_route}/#{resource_id}.json").to route_to(
              controller: controller,
              action:     'update',
              id:         resource_id,
              format:     'json'
            )
          end
        end
      end

      if expected_routes.include?(:destroy)
        describe "DELETE /#{root_route}/:id" do
          it "should route to #{controller_name}#destroy" do
            expect(delete: "/#{root_route}/#{resource_id}.json").to route_to(
              controller: controller,
              action:     'destroy',
              id:         resource_id,
              format:     'json'
            )
          end
        end
      end
    end
  end
end
