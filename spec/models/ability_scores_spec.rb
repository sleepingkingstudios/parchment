# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AbilityScores do
  describe '::ALL' do
    include_examples 'should have frozen constant',
      :ALL,
      %w[strength dexterity constitution intelligence wisdom charisma]
  end

  describe '::CHARISMA' do
    include_examples 'should have frozen constant', :CHARISMA, 'charisma'
  end

  describe '::CONSTITUTION' do
    include_examples 'should have frozen constant',
      :CONSTITUTION,
      'constitution'
  end

  describe '::DEXTERITY' do
    include_examples 'should have frozen constant', :DEXTERITY, 'dexterity'
  end

  describe '::INTELLIGENCE' do
    include_examples 'should have frozen constant',
      :INTELLIGENCE,
      'intelligence'
  end

  describe '::STRENGTH' do
    include_examples 'should have frozen constant', :STRENGTH, 'strength'
  end

  describe '::WISDOM' do
    include_examples 'should have frozen constant', :WISDOM, 'wisdom'
  end

  describe '.each' do
    it { expect(described_class).to respond_to(:each).with(0).arguments }

    it { expect(described_class.each.to_a).to be == described_class::ALL }

    it 'should yield each ability score' do
      expect { |block| described_class.each(&block) }
        .to yield_successive_args(*described_class::ALL)
    end
  end
end
