# frozen_string_literal: true

require 'cuprum/rails/request'

require 'authentication'

module Authentication
  class Request < Cuprum::Rails::Request
    property :session
  end
end
