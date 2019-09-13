# frozen_string_literal: true

require 'rails_helper'

require 'serializers/spell_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::SpellSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:spell) { FactoryBot.build(:spell) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { spell }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :casting_time,
      :description,
      :duration,
      :level,
      :material_component,
      :name,
      :range,
      :ritual,
      :school,
      :somatic_component,
      :verbal_component
  end
end
