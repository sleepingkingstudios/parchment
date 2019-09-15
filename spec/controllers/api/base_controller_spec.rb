# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::BaseController do
  subject(:controller) { described_class.new }

  describe '#responder' do
    let(:responder) { controller.send :responder }

    it 'should define the private method' do
      expect(controller).to respond_to(:responder, true).with(0).arguments
    end

    it { expect(responder).to be_a Responders::JsonResponder }

    it { expect(responder.controller).to be controller }
  end
end
