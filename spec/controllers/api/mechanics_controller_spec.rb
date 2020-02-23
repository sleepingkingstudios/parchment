# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::MechanicsController, type: :controller do
  describe '::PERMITTED_ATTRIBUTES' do
    include_examples 'should have frozen constant',
      :PERMITTED_ATTRIBUTES,
      %i[
        description
        name
        notes
        short_description
      ]
  end

  describe '#permitted_attributes' do
    include_examples 'should have private reader',
      :permitted_attributes,
      %i[
        description
        name
        notes
        short_description
      ]
  end
end
