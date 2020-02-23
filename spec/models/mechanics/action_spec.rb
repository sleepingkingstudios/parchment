# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Mechanics::Action, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:action) { described_class.new(attributes) }

  let(:attributes) do
    {
      description:       <<~TEXT,
        You throw the target creature out the nearest window. Harsh.
      TEXT
      name:              'Defenestrate',
      short_description: 'Throw target creature out the nearest window.'
    }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::Records::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '#created_at' do
    include_examples 'should have reader', :created_at
  end

  describe '#description' do
    include_examples 'should have attribute', :description, default: ''
  end

  describe '#id' do
    include_examples 'should have attribute',
      :id,
      value: '00000000-0000-0000-0000-000000000000'

    context 'when the action is persisted' do
      before(:example) { action.save! }

      it { expect(action.id).to be_a_uuid }
    end
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
    include_examples 'should have attribute',
      :type,
      default: 'Mechanics::Action',
      value:   nil
  end

  describe '#updated_at' do
    include_examples 'should have reader', :updated_at
  end

  describe '#valid?' do
    it { expect(action).not_to have_errors }

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
