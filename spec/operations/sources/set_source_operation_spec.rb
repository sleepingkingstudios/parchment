# frozen_string_literal: true

require 'rails_helper'

require 'operations/sources/set_source_operation'

require 'support/examples/operation_examples'
require 'support/examples/operations/association_examples'
require 'support/examples/operations/source_examples'

RSpec.describe Operations::Sources::SetSourceOperation do
  include Spec::Support::Examples::OperationExamples
  include Spec::Support::Examples::Operations::AssociationExamples
  include Spec::Support::Examples::Operations::SourceExamples

  subject(:operation) { described_class.new }

  describe '::new' do
    it { expect(described_class).to be_constructible.with(0).arguments }
  end

  describe '#call' do
    shared_context 'when the reference already has a source' do
      let(:old_origin) { FactoryBot.build(:book, title: 'Old Origin') }
      let(:old_source) do
        FactoryBot.build(:source, origin: old_origin, reference: reference)
      end

      before(:example) do
        old_origin.save!
        old_source.save!
      end
    end

    let(:reference)   { FactoryBot.build(:spell) }
    let(:origin)      { FactoryBot.build(:book, title: 'New Origin') }
    let(:origin_id)   { origin&.id }
    let(:origin_type) { origin&.class&.name }
    let(:attributes)  { {} }

    def call_operation
      operation.call(reference: reference, **attributes)
    end

    it { expect(operation).to respond_to(:call).with(2).arguments }

    include_examples 'should resolve the polymorphic association',
      :origin,
      permitted_types: { not: 'Spell' }

    include_examples 'should validate the reference'

    describe 'with a nil origin' do
      before(:example) { reference.save! }

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(reference)
      end

      it { expect { call_operation }.not_to change(Source, :count) }

      wrap_context 'when the reference already has a source' do
        it 'should have a passing result' do
          expect(call_operation).to have_passing_result.with_value(reference)
        end

        it { expect { call_operation }.to change(Source, :count).by(-1) }

        it 'should clear the source' do
          call_operation

          expect(reference.reload.source).to be nil
        end

        it 'should delete the old source' do
          call_operation

          expect(Source.where(id: old_source.id).exists?).to be false
        end

        it 'should remove the old reference' do
          call_operation

          expect(old_origin.reload.sources.map(&:reference)).to be == []
        end
      end
    end

    describe 'with a valid origin id and type' do
      let(:attributes) do
        super().merge(origin_id: origin_id, origin_type: origin_type)
      end

      before(:example) do
        origin.save!
        reference.save!
      end

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(reference)
      end

      it { expect { call_operation }.to change(Source, :count).by(1) }

      it 'should add the reference' do
        call_operation

        expect(origin.reload.sources.map(&:reference)).to include reference
      end

      it 'should set the origin' do
        call_operation

        expect(reference.reload.source.origin).to be == origin
      end

      it 'should set the source' do
        call_operation

        expect(reference.reload.source).to be_a Source
      end

      wrap_context 'when the reference already has a source' do
        it { expect { call_operation }.not_to change(Source, :count) }

        it { expect(call_operation.value).to be == reference }

        it 'should add the reference' do
          call_operation

          expect(origin.reload.sources.map(&:reference)).to include reference
        end

        it 'should delete the old source' do
          call_operation

          expect(Source.where(id: old_source.id).exists?).to be false
        end

        it 'should remove the old reference' do
          call_operation

          expect(old_origin.reload.sources.map(&:reference)).to be == []
        end

        it 'should set the origin' do
          call_operation

          expect(reference.reload.source.origin).to be == origin
        end

        it 'should set the source' do
          call_operation

          expect(reference.reload.source).to be_a Source
        end
      end

      describe 'with the same origin id and type' do
        include_context 'when the reference already has a source'

        let(:origin) { old_origin }

        it { expect { call_operation }.not_to change(Source, :count) }

        it { expect(call_operation.value).to be == reference }

        it 'should not delete the old source' do
          call_operation

          expect(Source.where(id: old_source.id).exists?).to be true
        end

        it 'should not remove the old reference' do
          call_operation

          expect(old_origin.reload.sources.map(&:reference))
            .to include reference
        end

        it 'should not change the source' do
          expect { call_operation }.not_to(change { reference.reload.source })
        end
      end
    end

    describe 'with a valid origin' do
      let(:attributes) { super().merge(origin: origin) }

      before(:example) do
        origin.save!
        reference.save!
      end

      it 'should have a passing result' do
        expect(call_operation).to have_passing_result.with_value(reference)
      end

      it { expect { call_operation }.to change(Source, :count).by(1) }

      it 'should add the reference' do
        call_operation

        expect(origin.reload.sources.map(&:reference)).to include reference
      end

      it 'should set the origin' do
        call_operation

        expect(reference.reload.source.origin).to be == origin
      end

      it 'should set the source' do
        call_operation

        expect(reference.reload.source).to be_a Source
      end

      wrap_context 'when the reference already has a source' do
        it { expect { call_operation }.not_to change(Source, :count) }

        it { expect(call_operation.value).to be == reference }

        it 'should add the reference' do
          call_operation

          expect(origin.reload.sources.map(&:reference)).to include reference
        end

        it 'should delete the old source' do
          call_operation

          expect(Source.where(id: old_source.id).exists?).to be false
        end

        it 'should remove the old reference' do
          call_operation

          expect(old_origin.reload.sources.map(&:reference)).to be == []
        end

        it 'should set the origin' do
          call_operation

          expect(reference.reload.source.origin).to be == origin
        end

        it 'should set the source' do
          call_operation

          expect(reference.reload.source).to be_a Source
        end
      end

      describe 'with the same origin' do
        include_context 'when the reference already has a source'

        let(:origin) { old_origin }

        it { expect { call_operation }.not_to change(Source, :count) }

        it { expect(call_operation.value).to be == reference }

        it 'should not delete the old source' do
          call_operation

          expect(Source.where(id: old_source.id).exists?).to be true
        end

        it 'should not remove the old reference' do
          call_operation

          expect(old_origin.reload.sources.map(&:reference))
            .to include reference
        end

        it 'should not change the source' do
          expect { call_operation }.not_to(change { reference.reload.source })
        end
      end
    end
  end
end
