# frozen_string_literal: true

require 'errors/server/unhandled_exception'

RSpec.describe Errors::Server::UnhandledException do
  shared_context 'when the exception has a cause' do
    let(:cause) { StandardError.new('A problem occurred') }

    before(:example) do
      allow(exception).to receive(:cause).and_return(cause)
    end
  end

  subject(:error) { described_class.new(exception: exception) }

  let(:exception) { StandardError.new('Something went wrong') }

  describe '::TYPE' do
    include_examples 'should define constant',
      :TYPE,
      'server.unhandled_exception'
  end

  describe '::new' do
    it 'should define the constructor' do
      expect(described_class)
        .to be_constructible
        .with(0).arguments
        .and_keywords(:exception)
    end
  end

  describe '#as_json' do
    let(:expected) do
      {
        'data'    => {
          'exception_class'   => exception.class.name,
          'exception_message' => exception.message
        },
        'message' => error.message,
        'type'    => described_class::TYPE
      }
    end

    it { expect(error).to respond_to(:as_json).with(0).arguments }

    it { expect(error.as_json).to be == expected }

    wrap_context 'when the exception has a cause' do
      let(:expected) do
        {
          'data'    => {
            'cause_class'       => cause.class.name,
            'cause_message'     => cause.message,
            'exception_class'   => exception.class.name,
            'exception_message' => exception.message
          },
          'message' => error.message,
          'type'    => described_class::TYPE
        }
      end

      it { expect(error.as_json).to be == expected }
    end
  end

  describe '#exception' do
    include_examples 'should have reader', :exception, -> { exception }
  end

  describe '#message' do
    let(:expected) do
      "Unhandled server exception #{exception.class}: #{exception.message}"
    end

    include_examples 'should have reader', :message, -> { expected }

    wrap_context 'when the exception has a cause' do
      let(:expected) do
        super() + " (caused by #{cause.class}: #{cause.message})"
      end

      it { expect(error.message).to be == expected }
    end
  end

  describe '#type' do
    include_examples 'should have reader', :type, 'server.unhandled_exception'
  end
end
