import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/page';
import SpellBlock from './block';
import { spellType } from '../entities';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../store/requestStatus';

const generateBreadcrumbs = (spell) => {
  let label = 'Loading...';

  if (spell.name) { label = spell.name; }

  return [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
    },
    {
      label,
      active: true,
    },
  ];
};

const emptyMessage = (status) => {
  switch (status) {
    case INITIALIZED:
    case PENDING:
      return 'Loading spell from the server...';
    case FAILURE:
      return 'Spell not found.';
    default:
      return 'Unable to load spell from the server.';
  }
};

const contents = ({ spell, status }) => {
  if (status === SUCCESS) {
    return (
      <SpellBlock spell={spell} />
    );
  }

  const message = emptyMessage(status);

  return (
    <p>{ message }</p>
  );
};

const getSpellId = ({ match }) => {
  const { params } = match;

  return params.id;
};

class ShowSpellPage extends React.Component {
  componentDidMount() {
    const { requestGetData } = this.props;
    const id = getSpellId(this.props);

    requestGetData({ id });
  }

  render() {
    const { data, status } = this.props;
    const { spell } = data;
    const breadcrumbs = generateBreadcrumbs(spell);

    return (
      <Page breadcrumbs={breadcrumbs} className="page-spells">
        { contents({ spell, status }) }
      </Page>
    );
  }
}

ShowSpellPage.defaultProps = {};

ShowSpellPage.propTypes = {
  data: PropTypes.shape({
    spell: PropTypes.oneOfType([
      spellType,
      PropTypes.object,
    ]).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestGetData: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default ShowSpellPage;
