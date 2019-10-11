# frozen_string_literal: true

require_relative '../pages'

module Features::Pages
  module FormHelper
    def fill_attributes(attributes) # rubocop:disable Metrics/AbcSize
      text_inputs.each do |attr_name|
        find_input(attr_name).fill_in(with: attributes[attr_name])
      end

      checkbox_inputs.each do |attr_name|
        find_checkbox_input(attr_name).click if attributes[attr_name]
      end

      select_inputs.each do |attr_name|
        find_select_option(attr_name, attributes[attr_name]).select_option
      end
    end

    def find_checkbox_input(attr_name)
      input_id = "spell-#{attr_name.to_s.tr('_', '-')}-input"

      find(%(label[for="#{input_id}"]))
    end

    def find_field(attr_name)
      class_name = "spell-#{attr_name.to_s.tr('_', '-')}-field"

      form_groups.find do |form_group|
        form_group[:class].include?(class_name)
      end
    end

    def find_input(attr_name, options = {})
      input_id = "#spell-#{attr_name.to_s.tr('_', '-')}-input"

      find(input_id, options)
    end

    def find_select_option(attr_name, value)
      input = find_input(attr_name)

      input.find(%(option[value="#{value}"]))
    end

    def get_value(attr_name)
      if checkbox_input?(attr_name)
        return find_input(attr_name, visible: false).checked?
      end

      find_input(attr_name).value
    end

    private

    def checkbox_input?(attr_name)
      checkbox_inputs.include?(attr_name)
    end

    def checkbox_inputs
      []
    end

    def select_inputs
      []
    end

    def text_inputs
      []
    end
  end
end
