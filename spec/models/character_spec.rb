# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.fdescribe Character, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:character) { described_class.new(attributes) }

  let(:attributes) do
    {
      name: 'Sofia'
    }
  end

  describe '.count' do
    include_examples 'should define class reader', :count, 0
  end

  describe '#name' do
    include_examples 'should define attribute',
      :name,
      value: ''
  end
end
