# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/routing_examples'

RSpec.describe 'routes' do
  include Spec::Support::Examples::RoutingExamples

  let(:controller) { 'client' }
  let(:book_id)    { '00000000-0000-0000-0000-000000000000' }

  include_examples 'should route to Client resource',
    'reference/skills',
    only: %i[index show]
end
