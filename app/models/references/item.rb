# frozen_string_literal: true

require 'operations/references/factory'

# An Item represents a purchasable item or service.
class References::Item < Reference
  self.table_name = 'items'

  Factory = Operations::References::Factory.new(self)

  class << self
    private

    def data_attribute(attr_name)
      attr_name   = attr_name.to_s
      reader_name = attr_name.intern
      writer_name = :"#{attr_name}="

      define_method(reader_name) { data[attr_name] }

      define_method(writer_name) { |value| data[attr_name] = value }
    end
  end

  ### Validations
  validates :cost,        presence: true
  validates :description, presence: true
  validates :name,
    presence:   true,
    uniqueness: true
end

# == Schema Information
#
# Table name: items
#
#  id                :uuid             not null, primary key
#  cost              :string           default(""), not null
#  data              :jsonb            not null
#  description       :text             default(""), not null
#  name              :string           default(""), not null
#  short_description :string           default(""), not null
#  slug              :string           default(""), not null
#  type              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
