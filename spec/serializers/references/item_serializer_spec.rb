# frozen_string_literal: true

require 'rails_helper'

require 'serializers/references/item_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::References::ItemSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:item) { FactoryBot.build(:item).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { item }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :cost,
      :description,
      :data,
      :name,
      :slug,
      :short_description,
      :type
  end
end
