# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/model_examples'
require 'support/examples/models/source_examples'

RSpec.describe References::Item do
  include Spec::Support::Examples::ModelExamples
  include Spec::Support::Examples::Models::SourceExamples

  subject(:item) { described_class.new(attributes) }

  let(:attributes) do
    {
      name:              'Plush Flumph',
      cost:              '50 pp',
      data:              { 'size' => 'XXL' },
      description:       'An adorable plush intelligent jellyfish. So cute!',
      slug:              'plush-flumph',
      short_description: 'A Flumph plushie.',
      type:              nil
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

  describe '#cost' do
    include_examples 'should have attribute', :cost, default: ''
  end

  describe '#data' do
    include_examples 'should have attribute', :data, default: {}
  end

  describe '#description' do
    include_examples 'should have attribute', :description, default: ''
  end

  describe '#name' do
    include_examples 'should have attribute', :name, default: ''
  end

  describe '#short_description' do
    include_examples 'should have attribute', :short_description, default: ''
  end

  describe '#valid?' do
    it { expect(item).not_to have_errors }

    include_examples 'should validate the presence of', :cost, type: String

    include_examples 'should validate the presence of',
      :description,
      type: String

    include_examples 'should validate the presence of', :name, type: String

    include_examples 'should validate the uniqueness of', :name
  end
end
