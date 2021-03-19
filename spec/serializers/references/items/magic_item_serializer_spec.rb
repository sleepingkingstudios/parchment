# frozen_string_literal: true

require 'rails_helper'

require 'serializers/references/items/magic_item_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::References::Items::MagicItemSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:magic_item) { FactoryBot.build(:magic_item).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { magic_item }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :category,
      :cost,
      :description,
      :data,
      :name,
      :rarity,
      :slug,
      :short_description,
      :type
  end
end
