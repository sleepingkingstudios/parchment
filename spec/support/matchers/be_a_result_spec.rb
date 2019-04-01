# frozen_string_literal: true

require 'support/matchers/be_a_result'

# rubocop:disable RSpec/FilePath
RSpec.describe RSpec::SleepingKingStudios::Matchers::Macros do
  let(:matcher_class) do
    Spec::Support::Matchers::BeAResultMatcher
  end
  let(:example_group) { self }

  describe '#be_a_failing_result' do
    let(:matcher) { example_group.be_a_failing_result }

    it 'should define the macro' do
      expect(example_group)
        .to respond_to(:be_a_failing_result)
        .with(0).arguments
    end

    it { expect(matcher).to be_a matcher_class }

    it { expect(matcher.description).to be == 'be a failing result' }
  end

  describe '#be_a_passing_result' do
    let(:matcher) { example_group.be_a_passing_result }

    it 'should define the macro' do
      expect(example_group)
        .to respond_to(:be_a_passing_result)
        .with(0).arguments
    end

    it { expect(matcher).to be_a matcher_class }

    it { expect(matcher.description).to be == 'be a passing result' }
  end

  describe '#be_a_result' do
    let(:matcher) { example_group.be_a_result }

    it 'should define the macro' do
      expect(example_group).to respond_to(:be_a_result).with(0).arguments
    end

    it { expect(matcher).to be_a matcher_class }

    it { expect(matcher.description).to be == 'be a result' }
  end

  describe '#have_result' do
    let(:matcher) { example_group.have_result }

    it { expect(example_group).to respond_to(:have_result).with(0).arguments }

    it { expect(matcher).to be_a RSpec::Matchers::AliasedMatcher }

    it { expect(matcher.base_matcher).to be_a matcher_class }

    it 'should have a custom description' do
      expect(matcher.description).to be == 'have result'
    end
  end

  describe '#have_failing_result' do
    let(:matcher) { example_group.have_failing_result }

    it 'should define the macro' do
      expect(example_group)
        .to respond_to(:have_failing_result)
        .with(0).arguments
    end

    it { expect(matcher).to be_a RSpec::Matchers::AliasedMatcher }

    it { expect(matcher.base_matcher).to be_a matcher_class }

    it 'should have a custom description' do
      expect(matcher.description).to be == 'have failing result'
    end
  end

  describe '#have_passing_result' do
    let(:matcher) { example_group.have_passing_result }

    it 'should define the macro' do
      expect(example_group)
        .to respond_to(:have_passing_result)
        .with(0).arguments
    end

    it { expect(matcher).to be_a RSpec::Matchers::AliasedMatcher }

    it { expect(matcher.base_matcher).to be_a matcher_class }

    it 'should have a custom description' do
      expect(matcher.description).to be == 'have passing result'
    end
  end
end
# rubocop:enable RSpec/FilePath
