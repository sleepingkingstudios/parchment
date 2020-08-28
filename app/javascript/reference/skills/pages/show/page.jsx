import React from 'react';
import PropTypes from 'prop-types';

import { ShowPage } from '../../../../components/show-page';
import { SkillBlock } from '../../components/block';
import endpoint, { hooks } from '../../store/showFindSkill';

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
      label: 'Skills',
      url: '/reference/skills',
    },
    {
      label: ((resource && resource.name) || 'Loading...'),
      url: `/reference/skills/${id}`,
      active: true,
    },
  ]
);
const getResourceId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const ShowSkillPage = ({ match }) => {
  const id = getResourceId({ match });
  const { useEndpoint } = hooks;
  const { data } = useEndpoint();
  const resource = data.skill;
  const breadcrumbs = generateBreadcrumbs({ id, resource });
  const buttons = [];

  return (
    <ShowPage
      Block={SkillBlock}
      breadcrumbs={breadcrumbs}
      buttons={buttons}
      endpoint={endpoint}
      match={match}
      resourceName="Skill"
    />
  );
};

ShowSkillPage.defaultProps = {};

ShowSkillPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowSkillPage;
