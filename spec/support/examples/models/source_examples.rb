# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples/models'

module Spec::Support::Examples::Models
  module SourceExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    shared_context 'when the origin has many sources' do
      let(:sources) do
        Array.new(3) do
          FactoryBot.build(:source, :with_spell, origin: subject)
        end
      end
      let(:references) { sources.map(&:reference) }

      before(:example) { sources.each(&:save!) }
    end

    shared_context 'when the reference has a source' do
      let(:source) do
        FactoryBot.build(:source, :with_book, reference: subject)
      end
      let(:origin) { source.origin }

      before(:example) { source.tap(&:save!) }
    end

    shared_examples 'should define a has_one :source association' do
      describe '#destroy' do
        wrap_context 'when the reference has a source' do
          it 'should destroy the source' do
            subject.destroy

            expect(Source.where(id: source.id).exists?).to be false
          end

          it 'should not destroy the origin' do
            subject.destroy

            expect(origin.class.where(id: origin.id).exists?).to be true
          end
        end
      end

      describe '#source' do
        include_examples 'should have property', :source, nil

        wrap_context 'when the spell has a source' do
          it { expect(spell.source).to be == source }
        end
      end
    end

    shared_examples 'should define a has_many :sources association' do
      describe '#destroy' do
        wrap_context 'when the origin has many sources' do
          it 'should destroy the sources', :aggregate_failures do
            subject.destroy

            sources.each do |source|
              expect(Source.where(id: source.id).exists?).to be false
            end
          end

          it 'should not destroy the references' do
            subject.destroy

            references.each do |reference|
              expect(reference.class.where(id: reference.id).exists?).to be true
            end
          end
        end
      end

      describe '#sources' do
        include_examples 'should have property', :sources, []

        wrap_context 'when the origin has many sources' do
          it { expect(subject.sources).to contain_exactly(*sources) }
        end
      end
    end
  end
end
