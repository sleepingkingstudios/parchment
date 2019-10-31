# frozen_string_literal: true

FactoryBot.define do
  factory :source, class: 'Source' do
    id { SecureRandom.uuid }

    metadata do
      {
        'name'     => 'Origin Name',
        'playtest' => false
      }
    end

    trait :with_book do
      transient do
        book { FactoryBot.create(:book) }
      end

      origin { book }

      metadata do
        {
          'name'     => book.title,
          'playtest' => book.playtest
        }
      end
    end

    trait :with_spell do
      reference { FactoryBot.create(:spell) }
    end
  end
end
