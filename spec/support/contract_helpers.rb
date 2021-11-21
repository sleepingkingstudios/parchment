# frozen_string_literal: true

module Spec
  module ContractHelpers
    # :nocov:
    # rubocop:disable RSpec/Focus
    def finclude_contract(contract, *args, **kwargs)
      fdescribe '(focused)' do # rubocop:disable RSpec/EmptyExampleGroup
        if kwargs.empty?
          include_contract(contract, *args)
        else
          include_contract(contract, *args, **kwargs)
        end
      end
    end
    # rubocop:enable RSpec/Focus

    def include_contract(contract_or_name, *args, **kwargs)
      contract =
        if contract_or_name.is_a?(Proc)
          contract_or_name
        else
          const_get(contract_or_name.titleize.tr(' ', '_').upcase)
        end

      instance_exec(*args, **kwargs, &contract)
    end

    def xinclude_contract(contract, *args, **kwargs)
      xdescribe '(skipped)' do # rubocop:disable RSpec/EmptyExampleGroup
        if kwargs.empty?
          include_contract(contract, *args)
        else
          include_contract(contract, *args, **kwargs)
        end
      end
    end
    # :nocov:
  end
end
