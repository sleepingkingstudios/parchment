# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'api/origins' }

  describe 'GET /api/origins.json' do
    it 'should route to Api::SpellsController#index' do
      expect(get: '/api/origins.json').to route_to(
        controller: controller,
        action:     'index',
        format:     'json'
      )
    end
  end
end
