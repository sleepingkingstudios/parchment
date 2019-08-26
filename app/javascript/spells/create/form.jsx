import { connect } from 'react-redux';

import SpellForm from '../form';
import { actions, request } from '../store/createSpellForm';

const { updateFormField } = actions;
const { performRequest } = request;

const mapStateToProps = (state) => {
  const { spells } = state;
  const { createSpellForm } = spells;
  const { data, errors, status } = createSpellForm;

  return {
    data,
    errors,
    requestStatus: status,
  };
};

const mapDispatchToProps = {
  onChangeAction: updateFormField,
  onSubmitAction: performRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpellForm);
