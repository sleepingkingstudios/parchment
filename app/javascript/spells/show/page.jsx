import React from 'react';
import PropTypes from 'prop-types';

import Page from '../../components/page';
import SpellBlock from './block';
import spellType from '../spell';
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

const contents = ({ spell, findSpellRequestStatus }) => {
  if (findSpellRequestStatus === SUCCESS) {
    return (
      <SpellBlock spell={spell} />
    );
  }

  const message = emptyMessage(findSpellRequestStatus);

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
    const { requestFindSpell } = this.props;
    const spellId = getSpellId(this.props);

    requestFindSpell(spellId);
  }

  render() {
    const title = 'Parchment';
    const subtitle = '5e Campaign Companion';
    const { spell, findSpellRequestStatus } = this.props;
    const breadcrumbs = generateBreadcrumbs(spell);

    return (
      <Page {...{ title, subtitle, breadcrumbs }} className="page-spells">
        <h1>Show Spell</h1>

        { contents({ spell, findSpellRequestStatus }) }
      </Page>
    );
  }
}

ShowSpellPage.defaultProps = {};

ShowSpellPage.propTypes = {
  findSpellRequestStatus: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestFindSpell: PropTypes.func.isRequired,
  spell: PropTypes.oneOfType([
    spellType,
    PropTypes.object,
  ]).isRequired,
};

export default ShowSpellPage;
