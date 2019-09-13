# frozen_string_literal: true

require 'rails_helper'

require 'serializers/record_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::RecordSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:record) { FactoryBot.create(:spell) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) do
      Spec::ExampleRecord.new('00000000-0000-0000-0000-000000000000')
    end

    example_class 'Spec::ExampleRecord', Struct.new(:id)

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes', :id
  end
end
