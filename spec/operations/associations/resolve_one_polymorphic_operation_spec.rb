# frozen_string_literal: true

require 'rails_helper'

require 'operations/associations/resolve_one_polymorphic_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'

RSpec.describe Operations::Associations::ResolveOnePolymorphicOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples

  shared_context 'when initialized with a types array of classes' do
    let(:permitted_types) { [Spell] }

    before(:example) { options.update(permitted_types: permitted_types) }
  end

  shared_context 'when initialized with a types array of strings' do
    let(:permitted_types) { %w[Spell] }

    before(:example) { options.update(permitted_types: permitted_types) }
  end

  subject(:operation) do
    described_class.new(association_name: association_name, **options)
  end

  let(:association_name) { 'spell' }
  let(:options)          { {} }

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:association_name, :permitted_types)
    end
  end

  describe '#call' do
    let(:spell)      { FactoryBot.build(:spell) }
    let(:spell_id)   { spell.id }
    let(:spell_type) { spell&.class&.name }
    let(:attributes) { {} }

    def call_operation
      operation.call(attributes)
    end

    it { expect(operation).to respond_to(:call).with(1).argument }

    include_examples 'should resolve the polymorphic association', :spell

    describe 'with a valid foreign key and type' do
      let(:spell) { FactoryBot.build(:spell) }
      let(:attributes) do
        super().merge(spell_id: spell.id, spell_type: 'Spell')
      end

      before(:example) { spell.save! }

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(be == spell)
      end
    end

    describe 'with a persisted association' do
      let(:attributes) { super().merge(spell: spell) }

      before(:example) { spell.save! }

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(spell)
      end

      describe 'with a matching foreign key' do
        let(:params) { super().merge(spell_id: spell.id) }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(spell)
        end
      end

      describe 'with a matching foreign type' do
        let(:params) { super().merge(spell_type: spell.class.name) }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(spell)
        end
      end
    end

    wrap_context 'when initialized with a types array of classes' do
      include_examples 'should resolve the polymorphic association',
        :spell,
        permitted_types: { not: Book }

      describe 'with a valid foreign key and type' do
        let(:spell) { FactoryBot.build(:spell) }
        let(:attributes) do
          super().merge(spell_id: spell.id, spell_type: 'Spell')
        end

        before(:example) { spell.save! }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(be == spell)
        end
      end

      describe 'with a persisted association' do
        let(:attributes) { super().merge(spell: spell) }

        before(:example) { spell.save! }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(spell)
        end

        describe 'with a matching foreign key' do
          let(:params) { super().merge(spell_id: spell.id) }

          it 'should have a passing result' do
            expect(call_operation).to have_passing_result.with_value(spell)
          end
        end

        describe 'with a matching foreign type' do
          let(:params) { super().merge(spell_type: spell.class.name) }

          it 'should have a passing result' do
            expect(call_operation).to have_passing_result.with_value(spell)
          end
        end
      end
    end

    wrap_context 'when initialized with a types array of strings' do
      include_examples 'should resolve the polymorphic association',
        :spell,
        permitted_types: { not: Book }

      describe 'with a valid foreign key and type' do
        let(:spell) { FactoryBot.build(:spell) }
        let(:attributes) do
          super().merge(spell_id: spell.id, spell_type: 'Spell')
        end

        before(:example) { spell.save! }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(be == spell)
        end
      end

      describe 'with a persisted association' do
        let(:attributes) { super().merge(spell: spell) }

        before(:example) { spell.save! }

        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(spell)
        end

        describe 'with a matching foreign key' do
          let(:params) { super().merge(spell_id: spell.id) }

          it 'should have a passing result' do
            expect(call_operation).to have_passing_result.with_value(spell)
          end
        end

        describe 'with a matching foreign type' do
          let(:params) { super().merge(spell_type: spell.class.name) }

          it 'should have a passing result' do
            expect(call_operation).to have_passing_result.with_value(spell)
          end
        end
      end
    end
  end
end
