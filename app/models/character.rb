# frozen_string_literal: true

class Character
  include Mongoid::Document

  field :name, type: String
end
