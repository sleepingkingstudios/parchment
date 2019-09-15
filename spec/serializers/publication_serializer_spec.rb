# frozen_string_literal: true

require 'rails_helper'

require 'serializers/publication_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::PublicationSerializer do
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

    describe 'with nil' do
      let(:error_class) { Serializers::InvalidObjectError }
      let(:error_message) do
        'Unable to serialize nil with Serializers::PublicationSerializer'
      end

      it 'should raise an error' do
        expect { serializer.call(nil) }
          .to raise_error error_class, error_message
      end
    end

    describe 'with an object' do
      let(:object)      { Object.new.freeze }
      let(:error_class) { Serializers::InvalidObjectError }
      let(:error_message) do
        "Unable to serialize #{object.inspect} with" \
        ' Serializers::PublicationSerializer'
      end

      it 'should raise an error' do
        expect { serializer.call(object) }
          .to raise_error error_class, error_message
      end
    end
  end
end
