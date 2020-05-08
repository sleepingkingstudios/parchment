# frozen_string_literal: true

require 'support/pages'

module Features::Pages
  module FormHelper
    def fill_attributes(attributes)
      text_inputs.each do |attr_name|
        find_input(attr_name).fill_in(with: attributes[attr_name])
      end

      checkbox_inputs.each do |attr_name|
        set_checkbox_value(attr_name, attributes[attr_name])
      end

      select_inputs.each do |attr_name|
        find_select_option(attr_name, attributes[attr_name]).select_option
      end
    end

    def find_checkbox_input(attr_name)
      input_id =
        join_id(attr_name: attr_name, prefix: input_prefix, suffix: 'input')

      find(%(label[for="#{input_id}"]))
    end

    def find_field(attr_name)
      class_name =
        join_id(attr_name: attr_name, prefix: input_prefix, suffix: 'field')

      form_groups.find do |form_group|
        form_group[:class].include?(class_name)
      end
    end

    def find_input(attr_name, options = {})
      input_id =
        join_id(attr_name: attr_name, prefix: input_prefix, suffix: 'input')

      find("##{input_id}", options)
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

    def set_checkbox_value(attr_name, value)
      input = find_input(attr_name, visible: false)
      label = find_checkbox_input(attr_name)

      label.click if input.checked? != value
    end

    private

    def checkbox_input?(attr_name)
      checkbox_inputs.include?(attr_name)
    end

    def checkbox_inputs
      []
    end

    def join_id(attr_name:, prefix: nil, suffix: nil)
      [
        prefix,
        attr_name.to_s.tr('_', '-'),
        suffix
      ]
        .compact
        .join('-')
    end

    def select_inputs
      []
    end

    def text_inputs
      []
    end
  end
end
