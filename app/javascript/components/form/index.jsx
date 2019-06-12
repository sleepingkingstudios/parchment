import React from 'react';
import PropTypes from 'prop-types';

import { handleSubmitWith } from './actions';
import { formType } from './entities';

const Form = ({ children, className, form }) => {
  const { onSubmitAction } = form;
  const onSubmit = handleSubmitWith(onSubmitAction);

  return (
    <form className={className} onSubmit={onSubmit}>
      <input type="submit" className="d-none" onClick={onSubmit} />

      { children }
    </form>
  );
};

Form.defaultProps = {
  className: null,
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  form: formType.isRequired,
};

export default Form;
