# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'api/spells/sources' }

  describe 'GET /api/spells/sources.json' do
    it 'should route to Api::Spells::SourcesController#index' do
      expect(get: '/api/spells/sources.json').to route_to(
        controller: controller,
        action:     'index',
        format:     'json'
      )
    end
  end
end
