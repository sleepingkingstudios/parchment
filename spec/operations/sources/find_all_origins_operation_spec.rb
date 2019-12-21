# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/find_all_origins_operation'

RSpec.describe Operations::Sources::FindAllOriginsOperation do
  shared_context 'when there are many books' do
    let(:books) { Array.new(3) { FactoryBot.build(:book) } }

    before(:example) { books.each(&:save!) }
  end

  subject(:operation) { described_class.new }

  describe '#initialize' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:expected) { { books: [] } }

    it { expect(operation).to respond_to(:call).with(0).arguments }

    it 'should return an empty result' do
      expect(operation.call).to be_a_passing_result.with_value(be == expected)
    end

    wrap_context 'when there are many books' do
      let(:expected) { super().merge(books: books.sort_by(&:title)) }

      it 'should return the books' do
        expect(operation.call).to be_a_passing_result.with_value(be == expected)
      end
    end
  end
end
