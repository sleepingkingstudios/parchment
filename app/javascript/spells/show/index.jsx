import { connect } from 'react-redux';

import LoadedSpellPage from './loaded';

const mapStateToProps = state => Object.assign(
  {},
  state.findSpell,
  state.router.location,
);
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadedSpellPage);
