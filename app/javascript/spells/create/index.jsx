import { connect } from 'react-redux';

import CreateSpellPage from './page';
import { actions, request } from './store/index';

const { updateFormField } = actions;
const { performRequest } = request;

const mapStateToProps = state => Object.assign(
  {},
  state.createSpell,
);

const mapDispatchToProps = {
  requestSubmitForm: performRequest,
  updateFormField,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpellPage);
