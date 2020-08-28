# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/source_examples'

RSpec.describe References::Skill, type: :model do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::SourceExamples

  subject(:skill) { described_class.new(attributes) }

  let(:attributes) do
    {
      name:              'Disco',
      ability_score:     AbilityScores::CHARISMA,
      description:       'Disco will never die!',
      short_description: 'Get down and boogie.',
      slug:              'disco'
    }
  end

  describe '::Factory' do
    include_examples 'should define constant',
      :Factory,
      -> { be_a Operations::References::Factory }

    it { expect(described_class::Factory.record_class).to be described_class }
  end

  describe '.slug_attribute' do
    include_examples 'should define class reader', :slug_attribute, 'name'
  end

  include_examples 'should define a has_one :source association'

  include_examples 'should have primary key'

  include_examples 'should have slug'

  include_examples 'should have timestamps'

  describe '#ability_score' do
    include_examples 'should have attribute', :ability_score, default: ''
  end

  describe '#description' do
    include_examples 'should have attribute', :description, default: ''
  end

  describe '#name' do
    include_examples 'should have attribute', :name, default: ''
  end

  describe '#valid?' do
    it { expect(skill).not_to have_errors }

    include_examples 'should validate the presence of',
      :ability_score,
      type: String

    include_examples 'should validate the inclusion of',
      :ability_score,
      in:      AbilityScores::ALL,
      message: 'must be strength, dexterity, constitution, intelligence,' \
               ' wisdom, or charisma'

    include_examples 'should validate the presence of',
      :description,
      type: String

    include_examples 'should validate the presence of', :name, type: String

    include_examples 'should validate the uniqueness of', :name
  end
end
