import ApiEndpoint from '../endpoint/index';
import DeleteOneRequest from './request';
import generateActions from '../endpoint/actions';
import generateInitialState from '../endpoint/initialState';
import generateHooks from './hooks';
import generateReducer from './reducer';

class DeleteOneEndpoint extends ApiEndpoint {
  constructor(options) {
    super(
      Object.assign(
        {
          generateActions,
          generateHooks,
          generateInitialState,
          generateReducer,
          generateRequest: opts => new DeleteOneRequest(opts),
        },
        options,
      ),
    );
  }
}

export default DeleteOneEndpoint;
