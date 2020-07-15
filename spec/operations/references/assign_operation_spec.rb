# frozen_string_literal: true

require 'rails_helper'

require 'operations/references/assign_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::References::AssignOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { {} }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { record_class.new }

    def call_operation
      operation.call(record, attributes)
    end

    it { expect(operation).to respond_to(:call).with(2).arguments }

    include_examples 'should validate the attributes'

    include_examples 'should validate the record'

    include_examples 'should handle unknown attributes',
      lambda {
        it { expect { call_operation }.not_to change(record, :attributes) }
      }

    describe 'with a hash with valid attributes' do
      let(:attributes) do
        {
          'name'         => 'The Blessing of Yevon',
          'casting_time' => '1 action',
          'description'  => 'It must be the blessing of Yevon!'
        }
      end
      let(:expected) do
        super()
          .merge('slug' => 'blessing-yevon')
          .merge(attributes)
      end

      it { expect(call_operation).to have_passing_result.with_value(record) }

      it 'should update the attributes' do
        expect { call_operation }
          .to change(record, :attributes)
          .to be >= expected
      end

      describe 'with an empty slug' do
        let(:attributes) { super().merge('slug' => '') }
        let(:expected)   { super().merge('slug' => 'blessing-yevon') }

        it { expect(call_operation).to have_passing_result.with_value(record) }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end
      end

      describe 'with a non-empty slug' do
        let(:attributes) { super().merge('slug' => 'it-must-be') }

        it { expect(call_operation).to have_passing_result.with_value(record) }

        it 'should update the attributes' do
          expect { call_operation }
            .to change(record, :attributes)
            .to be >= expected
        end
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
