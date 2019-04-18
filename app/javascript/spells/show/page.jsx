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

class ShowSpellPage extends React.Component {
  componentDidMount() {}

  render() {
    const title = 'Parchment';
    const subtitle = '5e Campaign Companion';
    const { spell, findSpellRequestStatus } = this.props;

    return (
      <Page className="page-spells" title={title} subtitle={subtitle}>
        <h1>Show Spell</h1>

        { contents({ spell, findSpellRequestStatus }) }
      </Page>
    );
  }
}

ShowSpellPage.defaultProps = {};

ShowSpellPage.propTypes = {
  findSpellRequestStatus: PropTypes.string.isRequired,
  spell: PropTypes.oneOfType([
    spellType,
    PropTypes.object,
  ]).isRequired,
};

export default ShowSpellPage;
