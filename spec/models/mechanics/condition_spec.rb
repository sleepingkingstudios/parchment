# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'

RSpec.describe Mechanics::Condition, type: :model do
  include Spec::Support::Examples::ModelExamples

  subject(:action) { described_class.new(attributes) }

  let(:attributes) do
    {
      description:       <<~TEXT,
        You take damage from healing effects, but are healed by *inflict* spells
        and similar effects.
      TEXT
      name:              'Zombie',
      short_description: 'Gain resistances and vulnerabilities of undead.'
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
    include_examples 'should have attribute',
      :type,
      default: 'Mechanics::Condition',
      value:   nil
  end

  describe '#valid?' do
    it { expect(action).not_to have_errors }

    include_examples 'should validate the presence of',
      :description,
      type: String

    include_examples 'should validate the presence of',
      :name,
      type: String

    include_examples 'should validate the uniqueness of',
      :name,
      attributes: FactoryBot.attributes_for(:action)

    include_examples 'should validate the presence of',
      :short_description,
      type: String
  end
end
