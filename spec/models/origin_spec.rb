# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Origin, type: :model do
  describe '.new' do
    let(:error_message) do
      'Origin is an abstract class and cannot be instantiated.'
    end

    it 'should raise an exception' do
      expect { described_class.new }
        .to raise_error NotImplementedError, error_message
    end
  end

  describe '.slug_attribute' do
    include_examples 'should define class reader', :slug_attribute, 'name'
  end
end
