import React from 'react';
import PropTypes from 'prop-types';

import HeadingWithButtons from '../components/heading-with-buttons';
import Page from '../components/page';
import SpellsTable from './table/index';
import { spellListType } from './entities';

const breadcrumbs = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Spells',
    url: '/spells',
    active: true,
  },
];

const buttons = [
  {
    label: 'Create Spell',
    outline: true,
    url: '/spells/create',
  },
];

class SpellsPage extends React.Component {
  componentDidMount() {
    const { requestSpells } = this.props;

    requestSpells();
  }

  render() {
    const { spells, spellsRequestStatus } = this.props;

    return (
      <Page breadcrumbs={breadcrumbs} className="page-spells">
        <HeadingWithButtons buttons={buttons}>Spells</HeadingWithButtons>

        <SpellsTable {...{ spells, spellsRequestStatus }} />
      </Page>
    );
  }
}

SpellsPage.defaultProps = {};

SpellsPage.propTypes = {
  requestSpells: PropTypes.func.isRequired,
  spells: spellListType.isRequired,
  spellsRequestStatus: PropTypes.string.isRequired,
};

export default SpellsPage;
