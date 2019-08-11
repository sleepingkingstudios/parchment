import { connect } from 'react-redux';

import SpellForm from '../form';
import { actions, request } from './store/index';

const { updateFormField } = actions;
const { performRequest } = request;

const mapStateToProps = (state) => {
  const { createSpell } = state;
  const { data, errors, status } = createSpell;

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
