import { connect } from 'react-redux';

import CreateSpellPage from './page';
import { updateSpellFormField } from '../store/actions';
import { requestCreateSpell } from '../store/apiActions';

const mapStateToProps = state => state.spells;

const mapDispatchToProps = {
  requestCreateSpell,
  updateSpellFormField,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpellPage);
