# frozen_string_literal: true

require 'rails_helper'

require 'support/examples/serializer_examples'

RSpec.describe PublicationSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:publication) { FactoryBot.build(:publication) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { publication }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :abbreviation,
      :name,
      :playtest,
      :publisher_name,
      :slug,
      official:         -> { publication.official? },
      publication_date: -> { publication.publication_date.iso8601 }
  end
end
