import React from 'react';
import PropTypes from 'prop-types';

import FormSelectOption from './option';

const buildOptions = ({ options }) => {
  const modOptions = options.map(item => item);

  return modOptions.map(({ label, selected, value }, index) => (
    /* eslint-disable-next-line react/no-array-index-key */
    <FormSelectOption key={`option-${index}`} label={label} selected={selected} value={value} />
  ));
};

const FormSelectOptionGroup = ({ label, options }) => (
  <optgroup label={label}>
    { buildOptions({ options }) }
  </optgroup>
);

FormSelectOptionGroup.defaultProps = {};

FormSelectOptionGroup.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormSelectOptionGroup;
