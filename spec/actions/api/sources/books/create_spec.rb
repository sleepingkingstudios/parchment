# frozen_string_literal: true

require 'rails_helper'

require 'cuprum/rails/repository'
require 'cuprum/rails/rspec/actions/create_contracts'

require 'actions/api/sources/books/create'

RSpec.describe Actions::Api::Sources::Books::Create do
  include Cuprum::Rails::RSpec::Actions::CreateContracts

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
  let(:invalid_attributes) do
    { 'title' => 'A Practical Guide To Evil' }
  end
  let(:valid_attributes) do
    {
      'title'            => 'A Practical Guide To Evil',
      'publisher_name'   => 'Erratic Errata',
      'publication_date' => '2015-03-25'
    }
  end
  let(:expected_attributes) do
    {
      'abbreviation' => 'apgte',
      'slug'         => 'practical-guide-to-evil'
    }
  end

  include_contract 'create action contract',
    invalid_attributes:  -> { invalid_attributes },
    valid_attributes:    -> { valid_attributes },
    expected_attributes: ->(hsh) { hsh.merge(expected_attributes) } \
  do
    describe 'with abbreviation: value' do
      let(:valid_attributes) do
        super().merge('abbreviation' => 'aitog')
      end
      let(:expected_attributes) do
        super().merge('abbreviation' => 'aitog')
      end

      include_contract 'should create the entity',
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

      include_contract 'should create the entity',
        valid_attributes:    -> { valid_attributes },
        expected_attributes: ->(hsh) { hsh.merge(expected_attributes) }
    end
  end
end
