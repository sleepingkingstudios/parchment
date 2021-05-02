# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/routing_examples'

RSpec.describe 'routes' do
  include Spec::Support::Examples::RoutingExamples

  describe 'GET /api/status' do
    it 'should route to Api::StatusController#show' do
      expect(get: '/api/status.json').to route_to(
        controller: 'api/status',
        action:     'show',
        format:     'json'
      )
    end
  end
end
