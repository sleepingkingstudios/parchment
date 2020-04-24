# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'api/authentication/sessions' }

  describe 'GET /api/authentication/session' do
    it 'should route to Api::Authentication::Sessions#show' do
      expect(get: '/api/authentication/session.json').to route_to(
        controller: controller,
        action:     'show',
        format:     'json'
      )
    end
  end
end
