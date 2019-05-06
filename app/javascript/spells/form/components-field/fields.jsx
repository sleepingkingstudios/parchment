import PropTypes from 'prop-types';

import FormCheckboxInput from '../../../components/form/checkbox-input';
import FormInput from '../../../components/form/input';

import {
  formGroup,
  formInput,
} from '../../../components/form/wrappers';
import { formType } from '../../../components/form/entities';

const MaterialInput = formGroup(
  formInput(FormInput, 'materialComponent'),
  { displayName: 'MaterialInput' },
);

MaterialInput.defaultProps = {
  placeholder: 'Material',
};

MaterialInput.propTypes = {
  form: formType.isRequired,
  placeholder: PropTypes.string,
};

const SomaticInput = formGroup(
  formInput(FormCheckboxInput, 'somaticComponent'),
  { displayName: 'SomaticInput' },
);

SomaticInput.defaultProps = {
  label: 'Somatic',
};

SomaticInput.propTypes = {
  form: formType.isRequired,
  label: PropTypes.string,
};

const VerbalInput = formGroup(
  formInput(FormCheckboxInput, 'verbalComponent'),
  { displayName: 'VerbalInput' },
);

VerbalInput.defaultProps = {
  label: 'Verbal',
};

VerbalInput.propTypes = {
  form: formType.isRequired,
  label: PropTypes.string,
};

export {
  MaterialInput,
  SomaticInput,
  VerbalInput,
};
