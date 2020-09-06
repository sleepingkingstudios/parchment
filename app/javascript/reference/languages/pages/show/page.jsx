import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../../components/show-page';
import { LanguageBlock } from '../../components/block';
import endpoint, { hooks } from '../../store/showFindLanguage';

const generateBreadcrumbs = ({
  id,
  resource,
}) => (
  [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Reference',
      url: '/reference',
      active: true,
    },
    {
      label: 'Languages',
      url: '/reference/languages',
    },
    {
      label: ((resource && resource.name) || 'Loading...'),
      url: `/reference/languages/${id}`,
      active: true,
    },
  ]
);
const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const ShowLanguagePage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const resource = data.language;
  const breadcrumbs = generateBreadcrumbs({ id, resource });
  const buttons = [];

  return (
    <ShowPage
      Block={LanguageBlock}
      breadcrumbs={breadcrumbs}
      buttons={buttons}
      endpoint={endpoint}
      match={match}
      resourceName="Language"
    />
  );
};

ShowLanguagePage.defaultProps = {};

ShowLanguagePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowLanguagePage;
