# frozen_string_literal: true

require 'rails_helper'

require 'models/naming'

require 'support/model'

RSpec.describe Models::Naming::Hooks do
  let(:described_class) { Spec::Widget }
  let(:widget)          { described_class.new(attributes) }
  let(:attributes) do
    { name: 'Illudium Q-36 Explosive Space Modulator' }
  end

  example_class 'Spec::Widget', Spec::Support::Model do |klass|
    klass.extend Models::Naming::Hooks # rubocop:disable RSpec/DescribedClass

    klass.attr_accessor \
      :abbr,
      :abbreviation,
      :name,
      :short_name,
      :slug
  end

  describe '::generate_abbreviation' do
    describe 'with an attribute name' do
      let(:expected) { 'iqesm' }

      before(:example) do
        Spec::Widget.generate_abbreviation(:name)
      end

      it 'should not set the abbreviation' do
        expect(widget.abbreviation).to be nil
      end

      it 'should generate the abbreviation on validation' do
        expect { widget.valid? }
          .to change(widget, :abbreviation)
          .to be == expected
      end

      context 'when the attributes includes an abbreviation' do
        let(:expected)   { 'ssm' }
        let(:attributes) { super().merge(abbreviation: expected) }

        it 'should not set the abbreviation' do
          expect(widget.abbreviation).to be == expected
        end

        it 'should not generate the abbreviation' do
          expect { widget.valid? }.not_to change(widget, :abbreviation)
        end
      end
    end

    describe 'with an attribute name and an alias' do
      let(:expected) { 'iqesm' }

      before(:example) do
        Spec::Widget.generate_abbreviation(:name, as: :abbr)
      end

      it 'should not set the abbreviation' do
        expect(widget.abbr).to be nil
      end

      it 'should generate the abbreviation on validation' do
        expect { widget.valid? }
          .to change(widget, :abbr)
          .to be == expected
      end

      context 'when the attributes includes an abbreviation' do
        let(:expected)   { 'ssm' }
        let(:attributes) { super().merge(abbr: expected) }

        it 'should not set the abbreviation' do
          expect(widget.abbr).to be == expected
        end

        it 'should not generate the abbreviation' do
          expect { widget.valid? }.not_to change(widget, :abbr)
        end
      end
    end
  end

  describe '::generate_slug' do
    describe 'with an attribute name' do
      let(:expected) { 'illudium-q36-explosive-space-modulator' }

      before(:example) do
        Spec::Widget.generate_slug(:name)
      end

      it 'should not set the slug' do
        expect(widget.slug).to be nil
      end

      it 'should generate the slug on validation' do
        expect { widget.valid? }
          .to change(widget, :slug)
          .to be == expected
      end

      context 'when the attributes includes a slug' do
        let(:expected)   { 'super-space-modulator' }
        let(:attributes) { super().merge(slug: expected) }

        it 'should not set the slug' do
          expect(widget.slug).to be == expected
        end

        it 'should not generate the slug' do
          expect { widget.valid? }.not_to change(widget, :slug)
        end
      end
    end

    describe 'with an attribute name and an alias' do
      let(:expected) { 'illudium-q36-explosive-space-modulator' }

      before(:example) do
        Spec::Widget.generate_slug(:name, as: :short_name)
      end

      it 'should not set the short name' do
        expect(widget.short_name).to be nil
      end

      it 'should generate the short name on validation' do
        expect { widget.valid? }
          .to change(widget, :short_name)
          .to be == expected
      end

      context 'when the attributes includes a short name' do
        let(:expected)   { 'super-space-modulator' }
        let(:attributes) { super().merge(short_name: expected) }

        it 'should not set the short name' do
          expect(widget.short_name).to be == expected
        end

        it 'should not generate the short name' do
          expect { widget.valid? }.not_to change(widget, :short_name)
        end
      end
    end
  end
end
