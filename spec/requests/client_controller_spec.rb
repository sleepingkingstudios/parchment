# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ClientController do
  let(:headers) { {} }
  let(:params)  { {} }

  describe 'GET /' do
    let(:pack_name) { 'client' }
    let(:pack_script) do
      %r{\<script src="/packs-test/js/#{pack_name}-[0-9a-f]+\.js"\>}
    end

    def call_action
      get '/', headers: headers, params: params
    end

    it 'should respond with 200 OK' do
      call_action

      expect(response).to have_http_status(:ok)
    end

    it 'should render the React wrapper' do
      call_action

      expect(response.body).to match pack_script
    end
  end
end
