# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'errors/invalid_association'
require 'errors/invalid_parameters'
require 'errors/invalid_record'

require 'support/examples'

module Spec::Support::Examples
  module OperationExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_examples 'should define a subclass' do
      subject(:operation) { subclass.new(*constructor_args) }

      let(:subclass) { build_subclass }
      let(:expected) do
        ::Operations::Records::Subclass
          .subclass_name(operation_class, record_class)
      end
      let(:operation_class) do
        defined?(super()) ? super() : described_class
      end
      let(:constructor_args) do
        defined?(super()) ? super() : []
      end

      it { expect(subclass).to be_a Class }

      it { expect(subclass).to be < described_class }

      it { expect(subclass.inspect).to be == expected }

      it { expect(subclass.name).to be == expected }

      it { expect(subclass.record_class).to be record_class }

      it { expect(operation.record_class).to be record_class }

      describe 'with as: name' do
        let(:custom_name) { 'Spec::CustomOperation' }
        let(:subclass)    { build_subclass(as: custom_name) }

        it { expect(subclass.inspect).to be == custom_name }

        it { expect(subclass.name).to be == custom_name }
      end
    end

    shared_examples 'should handle an invalid association name' do
      # :nocov:
      describe 'with a nil association name' do
        let(:association_name) { nil }
        let(:expected_error) do
          Errors::InvalidAssociation.new(
            association_name: association_name,
            record_class:     record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an Object as association name' do
        let(:association_name) { Object.new.freeze }
        let(:expected_error) do
          Errors::InvalidAssociation.new(
            association_name: association_name,
            record_class:     record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an empty string as association name' do
        let(:association_name) { '' }
        let(:expected_error) do
          Errors::InvalidAssociation.new(
            association_name: association_name,
            record_class:     record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an invalid association name' do
        let(:association_name) { 'invalid_association' }
        let(:expected_error) do
          Errors::InvalidAssociation.new(
            association_name: association_name,
            record_class:     record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end
      # :nocov:
    end

    shared_examples 'should handle invalid attributes' do |proc|
      describe 'when the attributes fail validation' do
        let(:attributes) do
          return invalid_attributes if defined?(invalid_attributes)

          {
            name:         'Fire Festival',
            casting_time: nil,
            duration:     'Too Long',
            level:        10,
            range:        'Foreman',
            school:       'Transubstantiation',
            description:  <<~DESCRIPTION
              Pretend to hold a music festival. Rake in the dough, yo.
            DESCRIPTION
          }
        end
        let(:expected_error) do
          if defined?(expected_validation_error)
            return expected_validation_error
          end

          Errors::FailedValidation.new(
            record: record_class.new(attributes).tap(&:valid?)
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end

        instance_exec(&proc) if proc.is_a?(Proc)
      end
    end

    shared_examples 'should handle unknown attributes' do |proc|
      describe 'with an attributes hash with unknown attributes' do
        let(:attributes) do
          {
            'difficulty' => 'high',
            'element'    => 'radiance',
            'explosion'  => 'megacolossal'
          }
        end
        let(:expected_error) do
          Errors::UnknownAttributes.new(
            attributes:   %w[difficulty],
            record_class: record_class
          )
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end

        instance_exec(&proc) if proc.is_a?(Proc)
      end
    end

    shared_examples 'should validate the attributes' do
      describe 'with nil attributes' do
        let(:attributes) { nil }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['attributes', 'must be a Hash']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an attributes Object' do
        let(:attributes) { Object.new }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['attributes', 'must be a Hash']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end
    end

    shared_examples 'should validate the foreign key' do |foreign_key|
      describe 'with a nil foreign key' do
        let(foreign_key) { nil }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_key.to_s, "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a foreign key Object' do
        let(foreign_key) { Object.new }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_key.to_s, 'must be a String']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an empty foreign key' do
        let(foreign_key) { '' }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_key.to_s, "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end
    end

    shared_examples 'should validate the foreign type' do |foreign_type|
      describe 'with a nil foreign type' do
        let(foreign_type) { nil }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_type.to_s, "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a foreign type Object' do
        let(foreign_type) { Object.new }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_type.to_s, 'must be a String']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an empty foreign type' do
        let(foreign_type) { '' }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_type.to_s, "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a foreign type that is not the name of a class' do
        let(foreign_type) { 'InvalidClassName' }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_type.to_s, 'is not a record class name']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a foreign type that is not the name of a record class' do
        let(foreign_type) { 'Object' }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [[foreign_type.to_s, 'is not a record class name']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end
    end

    shared_examples 'should validate the primary key' do
      describe 'with a nil primary key' do
        let(:id) { nil }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['id', "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a primary key Object' do
        let(:id) { Object.new }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['id', 'must be a String']])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with an empty primary key' do
        let(:id) { '' }
        let(:expected_error) do
          Errors::InvalidParameters
            .new(errors: [['id', "can't be blank"]])
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end
    end

    shared_examples 'should validate the record' do |expected_class|
      describe 'with a nil record' do
        let(:record_class) { expected_class || super() }
        let(:record)       { nil }
        let(:expected_error) do
          Errors::InvalidRecord.new(record_class: record_class)
        end

        it 'should have a failing result' do
          expect(call_operation)
            .to have_failing_result
            .with_error(expected_error)
        end
      end

      describe 'with a record Object' do
        let(:record_class) { expected_class || super() }
        let(:record)       { Object.new }
        let(:expected_error) do
          Errors::InvalidRecord.new(record_class: record_class)
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
