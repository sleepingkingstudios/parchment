import PropTypes from 'prop-types';

export const columnProps = {
  header: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  prop: PropTypes.string.isRequired,
  value: PropTypes.func,
  width: PropTypes.number,
};

export const columnType = PropTypes.shape(columnProps);

export const columnsType = PropTypes.arrayOf(columnType);
