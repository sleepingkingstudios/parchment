import { connect } from 'react-redux';

import CreateSpellPage from './page';
import { updateFormField } from './store/actions';
import { performRequest } from './store/apiActions';

const mapStateToProps = state => Object.assign(
  {},
  state.createSpell,
);

const mapDispatchToProps = {
  performRequest,
  updateFormField,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpellPage);
