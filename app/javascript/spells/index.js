import { connect } from 'react-redux';

import SpellsPage from './page';

const mapStateToProps = state => state.spells;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SpellsPage);
