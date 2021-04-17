# frozen_string_literal: true

module Features
  module Resources
    def self.all
      @all ||= %w[
        Action
        Book
        Condition
        Item
        Items::MagicItem
        Language
        Skill
        Spell
      ].map { |resource_name| find(resource_name) }
    end

    def self.find(resource_name)
      class_name = resource_name.classify
      definition = Features::Resources.const_get(class_name)

      return definition.instance if definition < Features::Resources::Definition

      raise NameError,
        "uninitialized constant Features::Resources::#{class_name}"
    end
  end
end
