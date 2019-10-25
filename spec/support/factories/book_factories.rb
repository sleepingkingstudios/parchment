# frozen_string_literal: true

FactoryBot.define do
  factory :book, class: 'Book' do
    id { SecureRandom.uuid }

    sequence(:title) { |index| "Book #{index}" }
    publication_date { Date.new(1982, 7, 9) }
    publisher_name   { 'Spelljammer Publishing' }
  end
end
