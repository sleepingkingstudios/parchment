import ApiEndpoint from '../endpoint/index';
import FindOneRequest from './request';
import generateActions from '../endpoint/actions';
import generateInitialState from '../endpoint/initialState';
import generateHooks from './hooks';
import generateReducer from './reducer';

class FindOneEndpoint extends ApiEndpoint {
  constructor(options) {
    super(
      Object.assign(
        {
          generateActions,
          generateHooks,
          generateInitialState,
          generateReducer,
          generateRequest: opts => new FindOneRequest(opts),
        },
        options,
      ),
    );
  }
}

export default FindOneEndpoint;
