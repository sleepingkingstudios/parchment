# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples/operation_examples'
require 'support/examples/operations'

module Spec::Support::Examples::Operations
  module AssociationExamples
    extend  RSpec::SleepingKingStudios::Concerns::SharedExampleGroup
    include Spec::Support::Examples::OperationExamples

    shared_examples 'should resolve the polymorphic association' \
    do |association_name, permitted_types: false|
      foreign_key_name  = :"#{association_name}_id"
      foreign_type_name = :"#{association_name}_type"

      describe 'with a foreign key and type' do
        let(:attributes) do
          super().merge(
            foreign_key_name  => send(foreign_key_name),
            foreign_type_name => send(foreign_type_name)
          )
        end

        include_examples 'should validate the foreign key', foreign_key_name

        include_examples 'should validate the foreign type', foreign_type_name

        describe 'with an invalid foreign key' do
          let(foreign_key_name) { '00000000-0000-0000-0000-000000000000' }
          let(:expected_error) do
            Errors::NotFound.new(
              attributes:   { foreign_key_name => send(foreign_key_name) },
              record_class: send(foreign_type_name).constantize
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result.with_error(expected_error)
          end
        end

        if permitted_types.is_a?(Hash) && permitted_types.key?(:not)
          describe 'with an invalid foreign type' do
            let(foreign_type_name) { permitted_types.fetch(:not).to_s }
            let(:expected_error) do
              Errors::InvalidParameters.new(
                errors: [
                  [foreign_type_name, "is not a valid #{association_name} type"]
                ]
              )
            end

            it 'should have a failing result' do
              expect(call_operation)
                .to have_failing_result
                .with_error(expected_error)
            end
          end
        end
      end

      describe 'with a non-record association' do
        let(association_name) { Object.new.freeze }
        let(:attributes) do
          super().merge(association_name => send(association_name))
        end
        let(:expected_error) do
          Errors::InvalidRecord.new(record_class: ApplicationRecord)
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      if permitted_types.is_a?(Hash) && permitted_types.key?(:not)
        describe 'with an invalid association' do
          let(association_name) do
            factory_name = permitted_types.fetch(:not).to_s.underscore.intern

            FactoryBot.build(factory_name)
          end
          let(:attributes) do
            super().merge(association_name => send(association_name))
          end
          let(:expected_error) do
            Errors::InvalidParameters.new(
              errors: [
                [foreign_type_name, "is not a valid #{association_name} type"]
              ]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end
      end

      describe 'with an unpersisted association' do
        let(:attributes) do
          super().merge(association_name => send(association_name))
        end
        let(:expected_error) do
          Errors::NotFound.new(
            attributes:   { foreign_key_name => send(foreign_key_name) },
            record_class: send(foreign_type_name).constantize
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end

        describe 'with a non-matching foreign key' do
          let(foreign_key_name) { '00000000-0000-0000-0000-000000000000' }
          let(:attributes) do
            super().merge(foreign_key_name => send(foreign_key_name))
          end
          let(:expected_error) do
            Errors::InvalidParameters.new(
              errors: [[foreign_key_name, 'does not match']]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end

        describe 'with a matching foreign key' do
          let(:attributes) do
            super().merge(foreign_key_name => send(association_name).id)
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end

        describe 'with a non-matching foreign type' do
          let(:attributes) do
            super().merge(foreign_type_name => 'ApplicationRecord')
          end
          let(:expected_error) do
            Errors::InvalidParameters.new(
              errors: [[foreign_type_name, 'does not match']]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end

        describe 'with a matching foreign type' do
          let(:attributes) do
            super().merge(
              foreign_type_name => send(association_name).class.name
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end
      end

      describe 'with a persisted association' do
        let(:attributes) do
          super().merge(association_name => send(association_name))
        end

        before(:example) { send(association_name).save! }

        describe 'with a non-matching foreign key' do
          let(foreign_key_name) { '00000000-0000-0000-0000-000000000000' }
          let(:attributes) do
            super().merge(foreign_key_name => send(foreign_key_name))
          end
          let(:expected_error) do
            Errors::InvalidParameters.new(
              errors: [[foreign_key_name, 'does not match']]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end

        describe 'with a non-matching foreign type' do
          let(foreign_key_name) { '00000000-0000-0000-0000-000000000000' }
          let(:attributes) do
            super().merge(foreign_key_name => send(foreign_key_name))
          end
          let(:expected_error) do
            Errors::InvalidParameters.new(
              errors: [[foreign_key_name, 'does not match']]
            )
          end

          it 'should have a failing result' do
            expect(call_operation)
              .to have_failing_result
              .with_error(expected_error)
          end
        end
      end
    end
  end
end
