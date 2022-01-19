# frozen_string_literal: true

require 'rails_helper'

require 'cuprum/rails/repository'
require 'cuprum/rails/rspec/actions/update_contracts'

require 'actions/api/sources/books/update'

RSpec.describe Actions::Api::Sources::Books::Update do
  include Cuprum::Rails::RSpec::Actions::UpdateContracts

  subject(:action) do
    described_class.new(repository: repository, resource: resource)
  end

  let(:repository) { Cuprum::Rails::Repository.new }
  let(:resource) do
    Cuprum::Rails::Resource.new(
      collection:           repository.find_or_create(record_class: Book),
      permitted_attributes: %i[
        abbreviation
        playtest
        publication_date
        publisher_name
        slug
        title
      ],
      resource_class: Book
    )
  end
  let(:book) do
    Book.new(
      'title'            => 'A Practical Guide To Evil',
      'abbreviation'     => 'apgte',
      'slug'             => 'practical-guide-to-evil',
      'publisher_name'   => 'Erratic Errata',
      'publication_date' => '2015-03-25'
    )
  end
  let(:invalid_attributes) do
    { 'publisher_name' => '' }
  end
  let(:valid_attributes) do
    {
      'title' => 'A Practical Guide To Evil: Do Wrong Right'
    }
  end
  let(:expected_attributes) do
    {
      'abbreviation' => 'apgte',
      'slug'         => 'practical-guide-to-evil'
    }
  end

  before(:example) { book.save! }

  include_contract 'update action contract',
    existing_entity:     -> { book },
    primary_key_value:   -> { SecureRandom.uuid },
    invalid_attributes:  -> { invalid_attributes },
    valid_attributes:    -> { valid_attributes },
    expected_attributes: ->(hsh) { hsh.merge(expected_attributes) } \
  do
    describe 'with abbreviation: empty' do
      let(:valid_attributes) do
        super().merge('abbreviation' => '')
      end
      let(:expected_attributes) do
        super().merge('abbreviation' => 'apgtedwr')
      end

      include_contract 'should update the entity',
        existing_entity:     -> { book },
        valid_attributes:    -> { valid_attributes },
        expected_attributes: ->(hsh) { hsh.merge(expected_attributes) }
    end

    describe 'with abbreviation: value' do
      let(:valid_attributes) do
        super().merge('abbreviation' => 'aitog')
      end
      let(:expected_attributes) do
        super().merge('abbreviation' => 'aitog')
      end

      include_contract 'should update the entity',
        existing_entity:     -> { book },
        valid_attributes:    -> { valid_attributes },
        expected_attributes: ->(hsh) { hsh.merge(expected_attributes) }
    end

    describe 'with slug: empty' do
      let(:valid_attributes) do
        super().merge('slug' => '')
      end
      let(:expected_attributes) do
        super().merge('slug' => 'practical-guide-to-evil-do-wrong-right')
      end

      include_contract 'should update the entity',
        existing_entity:     -> { book },
        valid_attributes:    -> { valid_attributes },
        expected_attributes: ->(hsh) { hsh.merge(expected_attributes) }
    end

    describe 'with slug: value' do
      let(:valid_attributes) do
        super().merge('slug' => 'an-impractical-treatise-on-good')
      end
      let(:expected_attributes) do
        super().merge('slug' => 'an-impractical-treatise-on-good')
      end

      include_contract 'should update the entity',
        existing_entity:     -> { book },
        valid_attributes:    -> { valid_attributes },
        expected_attributes: ->(hsh) { hsh.merge(expected_attributes) }
    end
  end
end
