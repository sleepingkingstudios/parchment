# frozen_string_literal: true

require 'rails_helper'

require 'serializers/references/skill_serializer'

require 'support/examples/serializer_examples'

RSpec.describe Serializers::References::SkillSerializer do
  include Spec::Support::Examples::SerializerExamples

  subject(:serializer) { described_class.new }

  let(:skill) { FactoryBot.build(:skill).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#serialize' do
    let(:object) { skill }

    it { expect(serializer).to respond_to(:serialize).with(1).argument }

    include_examples 'should serialize attributes',
      :id,
      :ability_score,
      :description,
      :name,
      :short_description,
      :slug
  end
end
