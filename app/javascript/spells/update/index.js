import { connect } from 'react-redux';

import UpdateSpellPageLoader from './loader';

const mapStateToProps = state => Object.assign(
  {},
  state.router.location,
);
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSpellPageLoader);
