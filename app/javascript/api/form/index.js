import ApiEndpoint from '../endpoint/index';
import FormRequest from './request';
import generateActions from './actions';
import generateInitialState from '../endpoint/initialState';
import generateHooks from './hooks';
import generateReducer from './reducer';

class FormEndpoint extends ApiEndpoint {
  constructor(options) {
    super(
      Object.assign(
        {
          generateActions,
          generateHooks,
          generateInitialState,
          generateReducer,
          generateRequest: opts => new FormRequest(opts),
          method: 'POST',
        },
        options,
      ),
    );
  }
}

export default FormEndpoint;
