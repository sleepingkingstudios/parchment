import { connect } from 'react-redux';

import SpellPageLoader from './loader';

const mapStateToProps = state => Object.assign(
  {},
  state.router.location,
);
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SpellPageLoader);
