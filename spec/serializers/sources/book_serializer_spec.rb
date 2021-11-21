# frozen_string_literal: true

require 'rails_helper'

require 'cuprum/rails/rspec/serializers_contracts'

require 'serializers/sources/book_serializer'

RSpec.describe Serializers::Sources::BookSerializer do
  include Cuprum::Rails::RSpec::SerializersContracts

  subject(:serializer) { described_class.new }

  let(:book) { FactoryBot.build(:book).tap(&:valid?) }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    let(:object) { book }

    it 'should define the method' do
      expect(serializer)
        .to respond_to(:call)
        .with(1).argument
        .and_keywords(:context)
    end

    include_contract 'should serialize attributes',
      :id,
      :abbreviation,
      :publisher_name,
      :slug,
      :title,
      publication_date: -> { book.publication_date.iso8601 }
  end
end
