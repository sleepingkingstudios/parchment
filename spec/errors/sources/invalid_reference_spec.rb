# frozen_string_literal: true

require 'rails_helper'

require 'errors/sources/invalid_reference'

RSpec.describe Errors::Sources::InvalidReference do
  subject(:error) { described_class.new }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'sources.invalid_reference'
  end

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#as_json' do
    let(:expected) do
      {
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }
  end

  describe '#message' do
    let(:expected_types) do
      tools.array.humanize_list(Source::REFERENCE_TYPES)
    end

    def tools
      SleepingKingStudios::Tools::Toolbelt.instance
    end

    include_examples 'should have reader',
      :message,
      -> { "Source reference should be one of: #{expected_types}" }
  end

  describe '#type' do
    include_examples 'should have reader', :type, 'sources.invalid_reference'
  end
end
