# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Mechanic, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:mechanic) { described_class.new(attributes) }

  let(:attributes) do
    {
      description:       <<~TEXT,
        You sit and think for a while.

        You're not entirely sure what this will accomplish. Maybe you should
        think about that instead.
      TEXT
      name:              'Ponder',
      short_description: 'Sit and think for a while.'
    }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::Records::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  include_examples 'should have primary key'

  include_examples 'should have timestamps'

  describe '#description' do
    include_examples 'should have attribute', :description, default: ''
  end

  describe '#name' do
    include_examples 'should have attribute', :name, default: ''
  end

  describe '#notes' do
    include_examples 'should have attribute',
      :notes,
      default: '',
      value:   'Not a great choice in the middle of a battle. But you do you.'
  end

  describe '#short_description' do
    include_examples 'should have attribute', :short_description, default: ''
  end

  describe '#type' do
    include_examples 'should have attribute', :type, value: nil

    context 'when the mechanic is persisted' do
      before(:example) { mechanic.save! }

      it { expect(mechanic.type).to be nil }
    end

    context 'with a Mechanic subclass' do
      let(:described_class) { Spec::CustomMechanic }

      example_class 'Spec::CustomMechanic', Mechanic

      context 'when the mechanic is persisted' do
        before(:example) { mechanic.save! }

        it { expect(mechanic.type).to be == described_class.name }
      end
    end
  end

  describe '#valid?' do
    it { expect(mechanic).not_to have_errors }

    include_examples 'should validate the presence of',
      :description,
      type: String

    include_examples 'should validate the presence of',
      :name,
      type: String

    include_examples 'should validate the presence of',
      :short_description,
      type: String
  end
end
