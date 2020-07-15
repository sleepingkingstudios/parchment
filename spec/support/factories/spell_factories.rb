# frozen_string_literal: true

require 'operations/attributes/generate_slug'

FactoryBot.define do
  factory :spell, class: 'Spell' do
    id { SecureRandom.uuid }

    transient do
      sequence(:spell_index) { |i| i }
    end

    name         { "Spell #{spell_index}" }
    slug         { Operations::Attributes::GenerateSlug.new.call(name).value }
    casting_time { '1 action' }
    duration     { 'Instantaneous' }
    level        { 1 }
    range        { '30 feet' }
    ritual       { false }
    school       { Spell::Schools.all.values.sample }

    material_component { '' }
    somatic_component  { false }
    verbal_component   { false }

    description { "The description for spell #{spell_index}." }
  end
end
