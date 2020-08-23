# frozen_string_literal: true

require 'rails_helper'

require 'serializers/mechanic_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::MechanicSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:mechanic) { FactoryBot.build(:mechanic).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { mechanic }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :description,
      :name,
      :notes,
      :short_description,
      :slug,
      :type
  end
end
