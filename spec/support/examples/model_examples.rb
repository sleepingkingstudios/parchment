# frozen_string_literal: true

require 'rspec/sleeping_king_studios/concerns/shared_example_group'

require 'support/examples'
require 'support/examples/models/validation_examples'

module Spec::Support::Examples
  module ModelExamples
    extend RSpec::SleepingKingStudios::Concerns::SharedExampleGroup

    DEFAULT_VALUE = Object.new.freeze
    private_constant :DEFAULT_VALUE

    def self.included(other)
      super

      other.include Spec::Support::Examples::Models::ValidationExamples
    end

    shared_examples 'should have attribute' \
      do |attr_name, default: nil, value: DEFAULT_VALUE|
        attr_name = attr_name.intern

        include_examples 'should have property', attr_name

        context "when the attributes do not include #{attr_name}" do
          let(:attributes) do
            super().tap do |hsh|
              hsh.delete(attr_name.intern)
              hsh.delete(attr_name.to_s)
            end
          end
          let(:default_value) do
            default.is_a?(Proc) ? instance_exec(&default) : default
          end

          it { expect(subject.send(attr_name)).to be == default_value }
        end

        context "when the attributes include #{attr_name}" do
          if value == DEFAULT_VALUE
            let(:expected) { attributes.fetch(attr_name.intern) }
          else
            let(:attributes) { super().merge(attr_name => value) }
            let(:expected)   { value }
          end

          it { expect(subject.public_send(attr_name)).to be == expected }
        end
      end
    alias_shared_examples 'should define attribute', 'should have attribute'

    shared_examples 'should have attribute option' \
      do |options_attr, option_name, default: nil, value: DEFAULT_VALUE|
        options_attr = options_attr.intern
        option_name  = option_name.intern

        include_examples 'should have attribute',
          option_name,
          default: default,
          value:   value

        context "when the #{options_attr} attribute does not include" \
                " #{option_name}" \
        do
          let(:attributes) do
            super().tap do |hsh|
              hsh.delete(option_name.intern)
              hsh.delete(option_name.to_s)

              options = hsh[options_attr.intern] || hsh[options_attr.to_s] || {}
              options.delete(option_name.intern)
              options.delete(option_name.to_s)
            end
          end

          it { expect(subject.send(option_name)).to be == default }
        end

        context "when the #{options_attr} attribute includes #{option_name}" do
          if value == DEFAULT_VALUE
            let(:attributes) do
              super().tap do |hsh|
                hsh.delete(option_name.intern)
                hsh.delete(option_name.to_s)
              end
            end
            let(:expected) do
              attributes.dig(options_attr.intern, option_name.intern)
            end
          else
            # :nocov:
            let(:attributes) do
              super().tap do |hsh|
                hsh.delete(option_name.intern)
                hsh.delete(option_name.to_s)

                options = hsh[options_attr.intern] || hsh[options_attr.to_s]
                options ||= (hsh[options_attr] = {})

                options.delete(option_name.to_s)
                options[option_name] = value
              end
            end
            let(:expected) { value }
            # :nocov:
          end

          it { expect(subject.send(option_name)).to be == expected }
        end
      end
    alias_shared_examples 'should define attribute option',
      'should have attribute option'

    shared_examples 'should have primary key' do
      describe '#id' do
        include_examples 'should have attribute',
          :id,
          value: '00000000-0000-0000-0000-000000000000'
      end
    end
    alias_shared_examples 'should define primary key',
      'should have primary key'

    shared_examples 'should have slug' do
      describe '#slug' do
        include_examples 'should have attribute', :slug, default: ''

        describe 'with a slug' do
          let(:attributes) { super().merge(slug: 'custom-slug') }
          let(:expected)   { attributes[:slug] }

          it { expect(subject.slug).to be == expected }
        end
      end

      describe '#valid?' do
        # rubocop:disable Layout/AlignHash
        include_examples 'should validate the format of',
          :slug,
          message:     'must be in kebab-case',
          matching:    {
            'example'               => 'a lowercase string',
            'example-slug'          => 'a kebab-case string',
            'example-compound-slug' =>
              'a kebab-case string with multiple words',
            '1st-example'           => 'a kebab-case string with digits'
          },
          nonmatching: {
            'InvalidSlug'   => 'a string with capital letters',
            'invalid slug'  => 'a string with whitespace',
            'invalid_slug'  => 'a string with underscores',
            '-invalid-slug' => 'a string with leading dash',
            'invalid-slug-' => 'a string with trailing dash'
          }
        # rubocop:enable Layout/AlignHash

        include_examples 'should validate the presence of', :slug, type: String

        include_examples 'should validate the uniqueness of', :slug
      end
    end
    alias_shared_examples 'should define slug', 'should have slug'

    shared_examples 'should have timestamps' do
      describe '#created_at' do
        include_examples 'should have reader', :created_at
      end

      describe '#updated_at' do
        include_examples 'should have reader', :updated_at
      end
    end
    alias_shared_examples 'should define timestamps', 'should have timestamps'
  end
end
