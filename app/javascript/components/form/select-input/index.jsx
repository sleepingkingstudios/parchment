import React from 'react';
import PropTypes from 'prop-types';

import FormSelectOption from './option';

const buildOptions = ({ defaultOption, options }) => {
  const modOptions = options.map(item => item);

  // TODO: Handle default option here.
  if (defaultOption) {
    modOptions.unshift({ label: defaultOption, value: '' });
  }

  return modOptions.map(({ label, selected, value }, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <FormSelectOption key={`option-${index}`} label={label} selected={selected} value={value} />
  ));
};

const FormSelectInput = ({
  defaultOption,
  id,
  options,
  prop,
  value,
  onChange,
}) => (
  <select id={id} data-prop-name={prop} className="custom-select" value={value} onChange={onChange}>
    { buildOptions({ defaultOption, options }) }
  </select>
);

FormSelectInput.defaultProps = {
  defaultOption: null,
};

FormSelectInput.propTypes = {
  defaultOption: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  prop: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormSelectInput;
