# frozen_string_literal: true

require 'rails_helper'

require 'serializers/source_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::SourceSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:source) { FactoryBot.build(:source, :with_book, :with_spell) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { source }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :metadata,
      :name,
      :origin_id,
      :origin_type,
      :playtest,
      :reference_id,
      :reference_type
  end
end
