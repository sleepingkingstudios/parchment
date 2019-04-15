import { connect } from 'react-redux';

import SpellsPage from './page';
import { requestSpells } from './store/apiActions';

const mapStateToProps = state => state.spells;

const mapDispatchToProps = { requestSpells };

export default connect(mapStateToProps, mapDispatchToProps)(SpellsPage);
