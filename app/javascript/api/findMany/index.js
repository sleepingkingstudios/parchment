import ApiEndpoint from '../endpoint/index';
import FindManyRequest from './request';
import generateActions from '../endpoint/actions';
import generateInitialState from '../endpoint/initialState';
import generateHooks from './hooks';
import generateReducer from './reducer';

class FindManyEndpoint extends ApiEndpoint {
  constructor(options) {
    super(
      Object.assign(
        {
          generateActions,
          generateHooks,
          generateInitialState,
          generateReducer,
          generateRequest: opts => new FindManyRequest(opts),
        },
        options,
      ),
    );
  }
}

export default FindManyEndpoint;
