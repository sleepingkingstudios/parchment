import React from 'react';
import PropTypes from 'prop-types';

import {
  exists,
  valueOrDefault,
} from 'utils/object';
import { addClassName } from 'utils/react';
import {
  kebabize,
  underscore,
} from 'utils/string';
import { columnProps } from '../entities';

const customClassName = ({ prop, resourceName }) => {
  const classifiedProp = underscore(prop).replace(/_/i, '-');

  return `${kebabize(resourceName)}-table-row-cell ${kebabize(resourceName)}-table-row-${classifiedProp}-cell`;
};

const defaultValue = prop => data => data[prop];

const DynamicTableRowCell = (props) => {
  /* eslint-disable react/prop-types */
  const {
    cellProps,
    data,
    prop,
    resourceName,
    value,
    width,
  } = props;
  /* eslint-enable react/prop-types */
  const cellValue = valueOrDefault(value, defaultValue(prop));
  const className = addClassName(
    'dynamic-table-row-cell',
    exists(resourceName) ? customClassName({ prop, resourceName }) : null,
    exists(width) ? `col-${width}` : 'col',
  );

  return (
    <div className={className}>
      { cellValue(Object.assign({}, cellProps, data)) }
    </div>
  );
};

DynamicTableRowCell.defaultProps = {
  cellProps: {},
  header: true,
  resourceName: null,
  width: null,
};

DynamicTableRowCell.propTypes = Object.assign(
  {},
  columnProps,
  {
    cellProps: PropTypes.object, /* eslint-disable-line react/forbid-prop-types */
    data: PropTypes.object,
    resourceName: PropTypes.string,
  },
);

export default DynamicTableRowCell;
