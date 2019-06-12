import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SpellPage from './page';
import { requestFindSpell } from '../store/apiActions';

const mapStateToProps = state => state.spells;

const mapDispatchToProps = { requestFindSpell };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpellPage));
