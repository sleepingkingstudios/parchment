# frozen_string_literal: true

require 'rails_helper'

require 'cuprum/rails/repository'
require 'cuprum/rails/rspec/actions_contracts'

require 'actions/api/sources/books/create'

RSpec.describe Actions::Api::Sources::Books::Create do
  include Cuprum::Rails::RSpec::ActionsContracts

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

  include_contract \
    Cuprum::Rails::RSpec::ActionsContracts::RESOURCE_ACTION_CONTRACT

  include_contract 'should require permitted attributes'

  include_contract 'should require parameters'

  include_contract 'should validate attributes',
    invalid_attributes:  { 'title' => 'A Practical Guide To Evil' },
    expected_attributes: lambda { |hsh|
      hsh.merge(
        'abbreviation' => 'apgte',
        'slug'         => 'practical-guide-to-evil'
      )
    }

  include_contract 'should create the record',
    valid_attributes:    {
      'title'            => 'A Practical Guide To Evil',
      'publisher_name'   => 'Erratic Errata',
      'publication_date' => '2015-03-25'
    },
    expected_attributes: lambda { |hsh|
      hsh.merge(
        'abbreviation' => 'apgte',
        'slug'         => 'practical-guide-to-evil'
      )
    }

  describe 'with abbreviation: value' do
    include_contract 'should create the record',
      valid_attributes:    {
        'title'            => 'A Practical Guide To Evil',
        'abbreviation'     => 'aitog',
        'publisher_name'   => 'Erratic Errata',
        'publication_date' => '2015-03-25'
      },
      expected_attributes: lambda { |hsh|
        hsh.merge('slug' => 'practical-guide-to-evil')
      }
  end

  describe 'with slug: value' do
    include_contract 'should create the record',
      valid_attributes:    {
        'title'            => 'A Practical Guide To Evil',
        'slug'             => 'impractical-treatise-good',
        'publisher_name'   => 'Erratic Errata',
        'publication_date' => '2015-03-25'
      },
      expected_attributes: lambda { |hsh|
        hsh.merge('abbreviation' => 'apgte')
      }
  end
end
