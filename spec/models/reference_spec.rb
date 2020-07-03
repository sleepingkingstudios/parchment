# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Reference do
  describe '.slug_attribute' do
    include_examples 'should define class reader', :slug_attribute, 'name'
  end
end
