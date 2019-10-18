# frozen_string_literal: true

require 'rails_helper'

require 'serializers/book_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::BookSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:book) { FactoryBot.build(:book).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { book }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :abbreviation,
      :name,
      :publication_date,
      :publisher_name,
      :slug
  end
end
