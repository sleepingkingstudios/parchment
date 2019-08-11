import { connect } from 'react-redux';

import LoadedSpellPage from './loaded';
import { request } from './store/index';

const { performRequest } = request;
const mapStateToProps = state => Object.assign(
  {},
  state.findSpell,
  state.router.location,
);
const mapDispatchToProps = { requestGetData: performRequest };

export default connect(mapStateToProps, mapDispatchToProps)(LoadedSpellPage);
