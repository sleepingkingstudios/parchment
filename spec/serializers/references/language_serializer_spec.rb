# frozen_string_literal: true

require 'rails_helper'

require 'serializers/references/language_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::References::LanguageSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:language) { FactoryBot.build(:language).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { language }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :name,
      :rarity,
      :script,
      :slug,
      :speakers
  end
end
