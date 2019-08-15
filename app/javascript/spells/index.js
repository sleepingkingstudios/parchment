import { connect } from 'react-redux';

import SpellsPage from './page';
import { request } from './store/findSpells/index';

const { performRequest } = request;

const mapStateToProps = (state) => {
  const { findSpells } = state.spells;
  const { data, status } = findSpells;
  const { spells } = data;

  return {
    spells,
    status,
  };
};

const mapDispatchToProps = { requestSpells: performRequest };

export default connect(mapStateToProps, mapDispatchToProps)(SpellsPage);
