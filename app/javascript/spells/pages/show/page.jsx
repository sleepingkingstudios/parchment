import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/page';
import ShowSpellBlock from './block';
import ShowSpellBreadcrumbs from './breadcrumbs';
import ShowSpellHeading from './heading';
import { hooks } from '../../store/showFindSpell';

const getSpellId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const { usePerformRequest } = hooks;

const ShowSpellPage = (props) => {
  const id = getSpellId(props);

  usePerformRequest({ wildcards: { id } })();

  return (
    <Page breadcrumbs={<ShowSpellBreadcrumbs />} className="page-spells">
      <ShowSpellHeading />

      <ShowSpellBlock />
    </Page>
  );
};

ShowSpellPage.defaultProps = {};

ShowSpellPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowSpellPage;
