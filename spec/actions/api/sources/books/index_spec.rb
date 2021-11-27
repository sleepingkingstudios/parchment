# frozen_string_literal: true

require 'rails_helper'

require 'actions/api/sources/books/index'

RSpec.describe Actions::Api::Sources::Books::Index do
  subject(:action) { described_class.new(resource: resource) }

  shared_context 'when there are many books' do
    let(:books) do
      [
        FactoryBot.build(:book, publisher_name: 'Flumph Free Press'),
        FactoryBot.build(:book, publisher_name: 'Flumph Free Press'),
        FactoryBot.build(:book, publisher_name: 'Flumph Free Press'),
        FactoryBot.build(:book, publisher_name: 'Spelljammer Publishing'),
        FactoryBot.build(:book, publisher_name: 'Spelljammer Publishing'),
        FactoryBot.build(:book, publisher_name: 'Spelljammer Publishing')
      ]
    end

    before(:example) { books.each(&:save!) }
  end

  let(:resource) do
    Cuprum::Rails::Resource.new(
      default_order:  :title,
      resource_class: ::Book
    )
  end

  describe '#call' do
    include_context 'when there are many books'

    let(:params)  { {} }
    let(:request) { instance_double(Cuprum::Rails::Request, params: params) }
    let(:expected_data) do
      Book.order(:title)
    end
    let(:expected_value) do
      { 'books' => expected_data }
    end

    it 'should return a passing result' do
      expect(action.call(request: request))
        .to be_a_passing_result
        .with_value(be == expected_value)
    end

    describe 'with a query' do
      let(:params) do
        super().merge(
          'order' => { 'title' => 'desc' },
          'where' => { 'publisher_name' => 'Flumph Free Press' }
        )
      end
      let(:expected_data) do
        Book.where(publisher_name: 'Flumph Free Press').order(title: :desc)
      end

      it 'should return a passing result' do
        expect(action.call(request: request))
          .to be_a_passing_result
          .with_value(be == expected_value)
      end
    end
  end
end
