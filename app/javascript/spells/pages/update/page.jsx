import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../../components/page';
import UpdateSpellBreadcrumbs from './breadcrumbs';
import UpdateSpellForm from './form';
import { hooks } from '../../store/updateFindSpell';

const getSpellId = ({ match }) => {
  const { params } = match;

  return params.id;
};

const { useRequestData } = hooks;

const UpdateSpellPage = (props) => {
  const id = getSpellId(props);
  const requestData = useRequestData({ wildcards: { id } });

  requestData();

  return (
    <Page breadcrumbs={<UpdateSpellBreadcrumbs />} className="page-update-spell">
      <h1>Update Spell</h1>

      <UpdateSpellForm />
    </Page>
  );
};

UpdateSpellPage.defaultProps = {};

UpdateSpellPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UpdateSpellPage;
