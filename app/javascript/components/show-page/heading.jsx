import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import HeadingWithButtons from '../heading-with-buttons';
import { valueOrDefault } from '../../utils/object';
import { underscore } from '../../utils/string';

const generateButtons = ({
  deleteData,
  id,
  resource,
  resourceName,
}) => {
  if (!(resource && resource.id)) { return []; }

  return [
    {
      label: `Update ${resourceName}`,
      outline: true,
      url: `/${underscore(pluralize(resourceName))}/${id}/update`,
    },
    {
      buttonStyle: 'danger',
      label: `Delete ${resourceName}`,
      onClick: deleteData,
      outline: true,
    },
  ];
};

const ShowPageHeading = (props) => {
  const {
    buttons,
    deleteEndpoint,
    id,
    resource,
    resourceName,
  } = props;
  const { hooks } = deleteEndpoint;
  const { useDeleteData } = hooks;
  const deleteData = useDeleteData({ wildcards: { id } });

  return (
    <HeadingWithButtons
      buttons={
        valueOrDefault(buttons, generateButtons({
          deleteData,
          id,
          resource,
          resourceName,
        }))
      }
    >
      {`Show ${resourceName}`}
    </HeadingWithButtons>
  );
};

ShowPageHeading.defaultProps = {
  buttons: null,
  resource: null,
};

ShowPageHeading.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object),
  deleteEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useDeleteData: PropTypes.func.isRequired,
    }),
  }).isRequired,
  id: PropTypes.string.isRequired,
  resource: PropTypes.shape({
    id: PropTypes.string,
  }),
  resourceName: PropTypes.string.isRequired,
};

export default ShowPageHeading;
