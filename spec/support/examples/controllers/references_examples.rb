# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'operations/authentication/generate_token'

require 'support/examples/controllers'

module Spec::Support::Examples::Controllers
  module ReferencesExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_examples 'should create the source' \
    do |resource_name|
      wrap_context 'with invalid attributes' do
        let(:resource_query) do
          attribute = resource_class.slug_attribute
          value     = send(:"#{resource_name}_params")[attribute]

          resource_class.where(attribute => value)
        end

        it 'should not create a source', :aggregate_failures do
          expect { call_action }.not_to change(Source, :count)

          resource = resource_query.first
          query    = Source.where(reference: resource)

          expect(query.exists?).to be false
        end
      end

      wrap_context 'with valid attributes' do
        let(:resource_query) do
          attribute = resource_class.slug_attribute
          value     = send(:"#{resource_name}_params")[attribute]

          resource_class.where(attribute => value)
        end

        it 'should create a source', :aggregate_failures do
          expect { call_action }.to change(Source, :count).by(1)

          resource = resource_query.first
          query    = Source.where(reference: resource)

          expect(query.exists?).to be true

          source = query.first

          expect(source.origin).to be == origin
          expect(source.reference).to be == resource
        end
      end
    end

    shared_examples 'should destroy the source' \
    do |resource_name|
      let!(:original_source) { send(resource_name).source }

      it 'should destroy the source', :aggregate_failures do
        expect { call_action }.to change(Source, :count).by(-1)

        query = Source.where(id: original_source.id)

        expect(query.exists?).to be false
      end
    end

    shared_examples 'should update the source' \
    do |resource_name|
      wrap_context 'with invalid attributes' do
        let!(:original_source) { send(resource_name).source }

        it 'should not change the source', :aggregate_failures do
          expect { call_action }.not_to change(Source, :count)

          resource = resource_class.find(send(:"#{resource_name}_id"))
          query    = Source.where(reference: resource)

          expect(query.exists?).to be true
          expect(query.first).to eq(original_source)
        end
      end

      wrap_context 'with valid attributes' do
        let!(:original_source) { send(resource_name).source }

        it 'should change the source', :aggregate_failures do
          expect { call_action }.not_to change(Source, :count)

          expect(Source.where(id: original_source.id).exists?).to be false

          resource = resource_class.find(send(:"#{resource_name}_id"))
          query    = Source.where(reference: resource)

          expect(query.exists?).to be true

          source = query.first

          expect(source.origin).to be == origin
          expect(source.reference).to be == resource
        end
      end
    end
  end
end
