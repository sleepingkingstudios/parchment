import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Button from '../button';
import LinkButton from '../link-button';
import EyeIcon from '../icons/eye';
import PencilSquareIcon from '../icons/pencil-square';
import TrashIcon from '../icons/trash';
import {
  exists,
  valueOrDefault,
} from '../../utils/object';
import { underscore } from '../../utils/string';

import './responsive-actions-styles.css';

const renderDeleteLink = (props) => {
  const {
    deleteEndpoint,
    id,
    onDelete,
    resourceName,
  } = props;

  if (!exists(deleteEndpoint)) { return null; }

  const classifiedName = underscore(resourceName).replace(/_/i, '-');
  const { hooks } = deleteEndpoint;
  const { useDeleteData } = hooks;
  const hookOptions = { wildcards: { id } };

  if (exists(onDelete)) {
    hookOptions.onSuccess = next => (inner) => {
      next(inner);

      onDelete(inner);
    };
  }

  const deleteResource = useDeleteData(hookOptions);

  return (
    <Button
      className={`delete-link delete-${classifiedName}-link col d-none d-md-inline`}
      onClick={deleteResource}
      link
      buttonStyle="danger"
    >
      <span className="d-lg-none d-xl-inline"><TrashIcon /></span>
      <span className="d-none d-lg-inline">Delete</span>
    </Button>
  );
};

const renderShowLink = (props) => {
  const { resourceName, url } = props;
  const classifiedName = underscore(resourceName).replace(/_/i, '-');

  return (
    <LinkButton
      className={`show-link show-${classifiedName}-link col`}
      link
      buttonStyle="info"
      url={url}
    >
      <span className="d-lg-none d-xl-inline"><EyeIcon /></span>
      <span className="d-none d-lg-inline">Show</span>
    </LinkButton>
  );
};

const renderUpdateLink = (props) => {
  const { resourceName, url } = props;
  const classifiedName = underscore(resourceName).replace(/_/i, '-');

  return (
    <LinkButton
      className={`update-link update-${classifiedName}-link col d-none d-md-inline`}
      link
      buttonStyle="link"
      url={`${url}/update`}
    >
      <span className="d-lg-none d-xl-inline"><PencilSquareIcon /></span>
      <span className="d-none d-lg-inline">Update</span>
    </LinkButton>
  );
};

const ResponsiveActions = (props) => {
  const {
    baseUrl,
    deleteEndpoint,
    id,
    onDelete,
    resourceName,
  } = props;
  const classifiedName = underscore(resourceName).replace(/_/i, '-');
  const className = `responsive-actions ${classifiedName}-actions row`;
  const url = `${valueOrDefault(baseUrl, `/${pluralize(resourceName)}`)}/${id}`;

  return (
    <div className={className}>
      { renderShowLink({ resourceName, url }) }
      { renderUpdateLink({ resourceName, url }) }
      {
        renderDeleteLink({
          deleteEndpoint,
          id,
          onDelete,
          resourceName,
        })
      }
    </div>
  );
};

ResponsiveActions.defaultProps = {
  baseUrl: null,
  deleteEndpoint: null,
  onDelete: null,
};

ResponsiveActions.propTypes = {
  baseUrl: PropTypes.string,
  deleteEndpoint: PropTypes.shape({
    hooks: PropTypes.shape({
      useDeleteData: PropTypes.func.isRequired,
    }).isRequired,
  }),
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  resourceName: PropTypes.string.isRequired,
};

export default ResponsiveActions;
