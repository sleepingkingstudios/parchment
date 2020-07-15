# frozen_string_literal: true

require 'operations/attributes/generate_slug'

FactoryBot.define do
  factory :book, class: 'Book' do
    id { SecureRandom.uuid }

    sequence(:title) { |index| "Book #{index}" }
    slug do
      Operations::Attributes::GenerateSlug.new.call(title).value
    end
    publication_date { Date.new(1982, 7, 9) }
    publisher_name   { 'Spelljammer Publishing' }
  end
end
