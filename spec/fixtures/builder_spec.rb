# frozen_string_literal: true

require 'rails_helper'

require 'fixtures/builder'

RSpec.describe Fixtures::Builder do
  shared_context 'with a custom environment' do
    subject(:builder) do
      described_class.new(record_class, environment: environment)
    end

    let(:environment) { 'secrets' }
  end

  shared_context 'when the fixtures are defined for the resource' do
    let(:data) do
      [
        {
          id:               '00000000-0000-0000-0000-000000000000',
          name:             'Star Wars',
          publication_date: '1977-05-25',
          publisher_name:   'Lucasfilm'
        },
        {
          id:               '00000000-0000-0000-0000-000000000001',
          name:             'The Empire Strikes Back',
          publication_date: '1980-06-20',
          publisher_name:   'Lucasfilm'
        },
        {
          id:               '00000000-0000-0000-0000-000000000002',
          name:             'Return of the Jedi',
          publication_date: '1983-05-25',
          publisher_name:   'Lucasfilm'
        }
      ].map(&:stringify_keys)
    end
  end

  subject(:builder) { described_class.new(record_class) }

  let(:record_class) { Publication }
  let(:environment)  { 'fixtures' }

  describe '::Error' do
    it { expect(described_class::Error).to be_a Class }

    it { expect(described_class::Error).to be < StandardError }
  end

  describe '::FixturesNotDefinedError' do
    it { expect(described_class::FixturesNotDefinedError).to be_a Class }

    it 'should subclass Fixtures::Builder::Error' do
      expect(described_class::FixturesNotDefinedError)
        .to be < described_class::Error
    end
  end

  describe '::InsufficientFixturesError' do
    it { expect(described_class::InsufficientFixturesError).to be_a Class }

    it 'should subclass Fixtures::Builder::Error' do
      expect(described_class::InsufficientFixturesError)
        .to be < described_class::Error
    end
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(1).argument
        .and_keywords(:environment)
    end
  end

  describe '#environment' do
    include_examples 'should have reader', :environment, 'fixtures'

    wrap_context 'with a custom environment' do
      it { expect(builder.environment).to be environment }
    end
  end

  describe '#build' do
    let(:read_data) { [] }

    before(:example) do
      # rubocop:disable RSpec/SubjectStub
      allow(builder).to receive(:read).and_return(read_data)
      # rubocop:enable RSpec/SubjectStub
    end

    it 'should define the method' do
      expect(builder)
        .to respond_to(:build)
        .with(0).arguments
        .and_keywords(:count)
    end

    it 'should delegate to read' do
      builder.build

      expect(builder).to have_received(:read).with(count: nil)
    end

    describe 'with count: value' do
      it 'should delegate to read' do
        builder.build(count: 3)

        expect(builder).to have_received(:read).with(count: 3)
      end
    end

    context 'when the data has no items' do
      it { expect(builder.build).to be == [] }

      it { expect { builder.build }.not_to change(record_class, :count) }
    end

    context 'when the data has one item' do
      include_context 'when the fixtures are defined for the resource'

      let(:read_data) { data[0..0] }
      let(:expected)  { read_data.map { |hsh| record_class.new(hsh) } }

      it { expect(builder.build).to be == expected }

      it { expect { builder.build }.not_to change(record_class, :count) }
    end

    context 'when the data has many items' do
      include_context 'when the fixtures are defined for the resource'

      let(:read_data) { data }
      let(:expected)  { read_data.map { |hsh| record_class.new(hsh) } }

      it { expect(builder.build).to be == expected }

      it { expect { builder.build }.not_to change(record_class, :count) }
    end
  end

  describe '#create' do
    let(:read_data) { [] }

    before(:example) do
      # rubocop:disable RSpec/SubjectStub
      allow(builder).to receive(:read).and_return(read_data)
      # rubocop:enable RSpec/SubjectStub
    end

    def match_attributes(attributes)
      satisfy do |actual|
        attributes.all? do |key, value|
          matches_attribute?(key, value, actual.public_send(key))
        end
      end
    end

    def matches_attribute?(key, expected, actual)
      expected = Date.parse(expected) if key.end_with?('_date')

      expected == actual
    end

    it 'should define the method' do
      expect(builder)
        .to respond_to(:create)
        .with(0).arguments
        .and_keywords(:count)
    end

    it 'should delegate to read' do
      builder.create

      expect(builder).to have_received(:read).with(count: nil)
    end

    describe 'with count: value' do
      it 'should delegate to read' do
        builder.create(count: 3)

        expect(builder).to have_received(:read).with(count: 3)
      end
    end

    context 'when the data has no items' do
      it { expect(builder.create).to be == [] }
    end

    context 'when the data has one item' do
      include_context 'when the fixtures are defined for the resource'

      let(:read_data) { data[0..0] }
      let(:expected)  { read_data.map { |hsh| record_class.new(hsh) } }

      it { expect(builder.create).to be == expected }

      it 'should persist the record' do
        expect(builder.create).to all satisfy(&:persisted?)
      end

      it { expect { builder.create }.to change(record_class, :count).by(1) }

      context 'when the record already exists' do
        let(:factory_name) { record_class.name.underscore.singularize.intern }
        let(:existing_record) do
          FactoryBot.build(factory_name, id: read_data.dig(0, 'id'))
        end

        before(:example) { existing_record.save! }

        it { expect(builder.create).to be == expected }

        it 'should persist the record' do
          expect(builder.create).to all satisfy(&:persisted?)
        end

        it { expect { builder.create }.not_to change(record_class, :count) }

        it 'should update the record' do
          builder.create

          expect(existing_record.reload).to match_attributes(read_data[0])
        end
      end
    end

    context 'when the data has many items' do
      include_context 'when the fixtures are defined for the resource'

      let(:read_data) { data }
      let(:expected)  { read_data.map { |hsh| record_class.new(hsh) } }

      it { expect(builder.create).to be == expected }

      it 'should persist the record' do
        expect(builder.create).to all satisfy(&:persisted?)
      end

      it { expect { builder.create }.to change(record_class, :count).by(3) }

      context 'when one of the records already exists' do
        let(:factory_name) { record_class.name.underscore.singularize.intern }
        let(:existing_record) do
          FactoryBot.build(factory_name, id: read_data.dig(1, 'id'))
        end

        before(:example) { existing_record.save! }

        it { expect(builder.create).to be == expected }

        it 'should persist the records' do
          expect(builder.create).to all satisfy(&:persisted?)
        end

        it { expect { builder.create }.to change(record_class, :count).by(2) }

        it 'should update the record' do
          builder.create

          expect(existing_record.reload).to match_attributes(read_data[1])
        end
      end

      context 'when each of the records already exist' do
        let(:factory_name) { record_class.name.underscore.singularize.intern }
        let(:existing_records) do
          read_data.map do |attributes|
            FactoryBot.build(factory_name, id: attributes.dig('id'))
          end
        end

        before(:example) { existing_records.each(&:save!) }

        it { expect(builder.create).to be == expected }

        it 'should persist the records' do
          expect(builder.create).to all satisfy(&:persisted?)
        end

        it { expect { builder.create }.not_to change(record_class, :count) }

        it 'should update the records' do # rubocop:disable RSpec/ExampleLength
          builder.create

          expect(existing_records.map(&:reload))
            .to all(
              satisfy do |record|
                attributes = read_data.find { |hsh| hsh['id'] == record.id }

                match_attributes(attributes)
              end
            )
        end
      end
    end
  end

  describe '#read' do
    let(:resource_name) { record_class.name.underscore.pluralize }
    let(:file_name)     { File.join environment, "#{resource_name}.yml" }
    let(:file_path)     { Rails.root.join 'data', file_name }
    let(:dir_name)      { File.join environment, resource_name }
    let(:dir_path)      { Rails.root.join 'data', dir_name }

    before(:example) do
      allow(File).to receive(:exist?).and_call_original
    end

    it 'should define the method' do
      expect(builder)
        .to respond_to(:read)
        .with(0).arguments
        .and_keywords(:count)
    end

    context 'when the data does not exist' do
      let(:error_message) { "Unable to load fixtures from /data/#{dir_name}" }

      before(:example) do
        allow(File).to receive(:exist?).with(file_path).and_return(false)
        allow(File).to receive(:exist?).with(dir_path).and_return(false)
      end

      it 'should raise an error' do
        expect { builder.read }.to raise_error(
          described_class::FixturesNotDefinedError,
          error_message
        )
      end
    end

    context 'when the data file exists' do
      let(:data) { [] }
      let(:raw)  { YAML.dump(data) }

      before(:example) do
        allow(File).to receive(:exist?).with(file_path).and_return(true)
        allow(File).to receive(:read).with(file_path).and_return(raw)
      end

      it 'should check that the file exists' do
        builder.read

        expect(File).to have_received(:exist?).with(file_path)
      end

      it 'should read the file' do
        builder.read

        expect(File).to have_received(:read).with(file_path)
      end

      it 'should return the data' do
        expect(builder.read).to be == data
      end

      describe 'with count: 0' do
        it { expect(builder.read count: 0).to be == [] }
      end

      describe 'with count: too many' do
        let(:error_message) { 'Requested 1 publication, but the data is empty' }

        it 'should raise an error' do
          expect { builder.read count: 1 }
            .to raise_error(
              described_class::InsufficientFixturesError,
              error_message
            )
        end
      end

      context 'when the file has data' do
        include_context 'when the fixtures are defined for the resource'

        it 'should return the data' do
          expect(builder.read).to be == data
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with count: 0' do
          it { expect(builder.read count: 0).to be == [] }
        end

        describe 'with count: 1' do
          it { expect(builder.read count: 1).to be == data[0...1] }
        end

        describe 'with count: 3' do
          it { expect(builder.read count: 3).to be == data[0...3] }
        end

        describe 'with count: too many' do
          let(:error_message) do
            'Requested 6 publications, but there are only 3 publications'
          end

          it 'should raise an error' do
            expect { builder.read count: 6 }
              .to raise_error(
                described_class::InsufficientFixturesError,
                error_message
              )
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end

    context 'when the data directory exists' do
      let(:data) { [] }
      let(:file_names) do
        data.map { |hsh| "#{hsh['name'].underscore.tr(' ', '_')}.yml" }
      end

      before(:example) do
        allow(File).to receive(:exist?).with(file_path).and_return(false)
        allow(File).to receive(:exist?).with(dir_path).and_return(true)
        allow(File).to receive(:directory?).with(dir_path).and_return(true)
        allow(Dir).to receive(:entries).with(dir_path).and_return(file_names)
        allow(File).to receive(:read)
      end

      it 'should check that the directory exists' do
        builder.read

        expect(File).to have_received(:exist?).with(dir_path)
      end

      it 'should check that the directory is a directory' do
        builder.read

        expect(File).to have_received(:directory?).with(dir_path)
      end

      it 'should enumerate the files' do
        builder.read

        expect(Dir).to have_received(:entries).with(dir_path)
      end

      it 'should not read any files' do
        builder.read

        expect(File).not_to have_received(:read)
      end

      it 'should return the data' do
        expect(builder.read).to be == data
      end

      describe 'with count: 0' do
        it { expect(builder.read count: 0).to be == [] }
      end

      describe 'with count: too many' do
        let(:error_message) { 'Requested 1 publication, but the data is empty' }

        it 'should raise an error' do
          expect { builder.read count: 1 }
            .to raise_error(
              described_class::InsufficientFixturesError,
              error_message
            )
        end
      end

      context 'when there are data files' do
        include_context 'when the fixtures are defined for the resource'

        before(:example) do
          data.each do |hsh|
            file_name = "#{hsh['name'].underscore.tr(' ', '_')}.yml"
            raw       = YAML.dump(hsh)

            allow(File).to receive(:read).with(file_name).and_return(raw)
          end
        end

        it 'should read each file' do
          builder.read

          file_names.each do |file_name|
            expect(File).to have_received(:read).with(file_name)
          end
        end

        it 'should return the data' do
          expect(builder.read).to be == data
        end

        # rubocop:disable RSpec/NestedGroups
        describe 'with count: 0' do
          it { expect(builder.read count: 0).to be == [] }
        end

        describe 'with count: 1' do
          it { expect(builder.read count: 1).to be == data[0...1] }
        end

        describe 'with count: 3' do
          it { expect(builder.read count: 3).to be == data[0...3] }
        end

        describe 'with count: too many' do
          let(:error_message) do
            'Requested 6 publications, but there are only 3 publications'
          end

          it 'should raise an error' do
            expect { builder.read count: 6 }
              .to raise_error(
                described_class::InsufficientFixturesError,
                error_message
              )
          end
        end
        # rubocop:enable RSpec/NestedGroups
      end
    end
  end

  describe '#record_class' do
    include_examples 'should have reader', :record_class, -> { record_class }
  end
end
