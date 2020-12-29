# frozen_string_literal: true

require 'operations/attributes/generate_slug'

FactoryBot.define do
  factory :item, class: 'References::Item' do
    id { SecureRandom.uuid }

    transient do
      sequence(:item_index) { |i| i }
    end

    name        { "Item #{item_index}" }
    slug        { Operations::Attributes::GenerateSlug.new.call(name).value }
    cost        { '1 cp' }
    data        { {} }
    description { "The description for item #{item_index}." }
  end
end
