import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { columnProps } from '../entities';
import { addClassName } from '../../../utils/react';
import { exists } from '../../../utils/object';
import {
  capitalize,
  underscore,
} from '../../../utils/string';

const cellValue = ({ label, prop }) => {
  if (label === false) { return (<Fragment>&nbsp;</Fragment>); }

  if (label === true) {
    return underscore(prop).split('_').map(word => capitalize(word)).join(' ');
  }

  return label;
};

const customClassName = ({ prop, resourceName }) => {
  const classifiedProp = underscore(prop).replace(/_/i, '-');

  return `${resourceName}-table-header-cell ${resourceName}-table-header-${classifiedProp}-cell`;
};

const DynamicTableHeaderCell = (props) => {
  const {
    /* eslint-disable react/prop-types */
    header,
    label,
    prop,
    resourceName,
    width,
    /* eslint-enable react/prop-types */
  } = props;

  if (header === false) { return null; }

  const className = addClassName(
    'dynamic-table-header-cell',
    exists(resourceName) ? customClassName({ prop, resourceName }) : null,
    exists(width) ? `col-${width}` : 'col',
  );

  return (
    <div className={className}>
      { cellValue({ label, prop }) }
    </div>
  );
};

DynamicTableHeaderCell.defaultProps = {
  header: true,
  resourceName: null,
  width: null,
};

DynamicTableHeaderCell.propTypes = Object.assign(
  {},
  columnProps,
  {
    resourceName: PropTypes.string,
  },
);

export default DynamicTableHeaderCell;
