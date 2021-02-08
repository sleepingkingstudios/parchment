import {
  useDispatch,
  useSelector,
} from 'react-redux';

import generateHooks from './hooks';
import { shouldGenerateTheHooks } from './testHelpers';

jest.mock('react-redux');

const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
useSelector.mockImplementation(() => null);

describe('resource data generateHooks()', () => {
  const UPDATE_FORM_DATA = 'test/updateFormData';
  const updateFormData = data => ({
    type: UPDATE_FORM_DATA,
    payload: data,
  });
  const actions = {
    UPDATE_FORM_DATA,
    updateFormData,
  };
  const namespace = 'path/to/widgets';
  const hooks = generateHooks({
    actions,
    namespace,
  });

  shouldGenerateTheHooks({
    actions,
    hooks,
    namespace,
    useDispatch,
    useSelector,
  });
});
