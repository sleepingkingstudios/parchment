# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'routes' do
  let(:controller) { 'client' }

  describe 'GET /' do
    it 'should route to ClientController#index' do
      expect(get: '/').to route_to(
        controller: controller,
        action:     'index'
      )
    end
  end
end
