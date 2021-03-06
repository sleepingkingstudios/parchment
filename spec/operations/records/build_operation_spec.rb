# frozen_string_literal: true

require 'rails_helper'

require 'operations/records/build_operation'

require 'support/examples/operation_examples'

RSpec.describe Operations::Records::BuildOperation do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { described_class.new(record_class) }

  let(:record_class) { Spell }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(1).argument }
  end

  describe '#call' do
    let(:attributes) { nil }
    let(:expected)   { record_class.new.attributes }
    let(:record)     { call_operation.value }

    def call_operation
      operation.call(attributes: attributes)
    end

    it 'should define the method' do
      expect(operation)
        .to respond_to(:call)
        .with(0).arguments
        .and_keywords(:attributes)
    end

    include_examples 'should validate the attributes'

    include_examples 'should handle unknown attributes'

    describe 'with no arguments' do
      let(:expected) { super().merge('id' => be_a_uuid) }

      def call_operation
        operation.call
      end

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to deep_match expected }
    end

    describe 'with an empty hash' do
      let(:attributes) { {} }
      let(:expected)   { super().merge(attributes, 'id' => be_a_uuid) }

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to deep_match expected }
    end

    describe 'with a hash with valid attributes' do
      let(:attributes) do
        {
          'name'         => 'The Blessing of Yevon',
          'casting_time' => '1 action',
          'description'  => 'It must be the blessing of Yevon!'
        }
      end
      let(:expected) { super().merge(attributes, 'id' => be_a_uuid) }

      it { expect(call_operation).to have_passing_result }

      it { expect(record).to be_a record_class }

      it { expect(record.attributes).to deep_match expected }

      describe 'with a hash with a primary key' do
        let(:id)         { '00000000-0000-0000-0000-000000000000' }
        let(:attributes) { super().merge('id' => id) }

        include_examples 'should validate the primary key'

        it { expect(call_operation).to have_passing_result }

        it { expect(record).to be_a record_class }

        it { expect(record.attributes).to deep_match expected }
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
