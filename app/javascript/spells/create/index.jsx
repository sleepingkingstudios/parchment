import { connect } from 'react-redux';

import CreateSpellPage from './page';
import { actions, apiActions } from './store';

const { updateFormField } = actions;
const { requestSubmitForm } = apiActions;

const mapStateToProps = state => Object.assign(
  {},
  state.createSpell,
);

const mapDispatchToProps = {
  requestSubmitForm,
  updateFormField,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpellPage);
