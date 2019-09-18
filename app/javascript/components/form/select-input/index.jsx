import React from 'react';
import PropTypes from 'prop-types';

import FormSelectGroup from './group';
import FormSelectOption from './option';
import { addClassName } from '../../../utils/react';

const buildOptions = ({ defaultOption, options }) => {
  const modOptions = options.map(item => item);

  if (defaultOption) {
    modOptions.unshift({ label: defaultOption, value: '' });
  }

  return modOptions.map(({ label, selected, value }, index) => {
    // TODO: Actually check this.
    if (Array.isArray(value)) {
      return (
        /* eslint-disable-next-line react/no-array-index-key */
        <FormSelectGroup key={`group-${index}`} label={label} options={value} />
      );
    }

    return (
      /* eslint-disable-next-line react/no-array-index-key */
      <FormSelectOption key={`option-${index}`} label={label} selected={selected} value={value} />
    );
  });
};

const validClassName = (validStatus) => {
  switch (validStatus) {
    case 'valid':
      return 'is-valid';
    case 'invalid':
      return 'is-invalid';
    default:
      return null;
  }
};

const FormSelectInput = ({
  className,
  defaultOption,
  id,
  options,
  value,
  onChange,
  validStatus,
}) => {
  const props = {
    className: addClassName(
      'custom-select',
      className,
      validClassName(validStatus),
    ),
    id,
    value,
    onChange,
  };

  return (
    <select {...props}>
      { buildOptions({ defaultOption, options }) }
    </select>
  );
};

FormSelectInput.defaultProps = {
  className: null,
  defaultOption: null,
  validStatus: null,
};

FormSelectInput.propTypes = {
  className: PropTypes.string,
  defaultOption: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  validStatus: PropTypes.oneOf(['valid', 'invalid', null]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormSelectInput;
