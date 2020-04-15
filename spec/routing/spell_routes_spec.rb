# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/routing_examples'

RSpec.describe 'routes' do
  include Spec::Support::Examples::RoutingExamples

  include_examples 'should route to Client resource', 'spells'
end
