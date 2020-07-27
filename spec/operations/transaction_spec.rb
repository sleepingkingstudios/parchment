# frozen_string_literal: true

require 'rails_helper'

require 'operations/transaction'

require 'support/examples/operation_examples'

RSpec.describe Operations::Transaction do
  include Spec::Support::Examples::OperationExamples

  subject(:operation) { Spec::TransactionalOperation.new }

  example_class 'Spec::TransactionalOperation', Cuprum::Operation do |klass|
    klass.include described_class
  end

  include_examples 'should define a #transaction method'
end
