import { connect } from 'react-redux';

import SpellForm from '../form';
import { actions, request } from './store/form/index';

const { updateFormField } = actions;
const { performRequest } = request;

const onSubmitAction = () => (dispatch, getState) => {
  const { updateSpellForm } = getState();
  const { data } = updateSpellForm;
  const { spell } = data;
  const { id } = spell;

  return performRequest({ wildcards: { id } })(dispatch, getState);
};

const mapStateToProps = (state) => {
  const { updateSpellForm } = state;
  const { data, errors, status } = updateSpellForm;

  return {
    data,
    errors,
    requestStatus: status,
  };
};

const mapDispatchToProps = {
  onChangeAction: updateFormField,
  onSubmitAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpellForm);
