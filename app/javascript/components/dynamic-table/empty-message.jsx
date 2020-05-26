import React from 'react';
import PropTypes from 'prop-types';

const DynamicTableEmptyMessage = (props) => {
  const { message } = props;

  return (
    <div className="col-12 dynamic-table-empty-message">
      { message }
    </div>
  );
};

DynamicTableEmptyMessage.defaultProps = {};

DynamicTableEmptyMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default DynamicTableEmptyMessage;
