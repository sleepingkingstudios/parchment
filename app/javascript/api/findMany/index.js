import ApiEndpoint from '../endpoint/index';
import FindOneRequest from './request';
import generateActions from '../endpoint/actions';
import generateInitialState from '../endpoint/initialState';
import generateReducer from './reducer';

class FindManyEndpoint extends ApiEndpoint {
  constructor(options) {
    super(
      Object.assign(
        {
          generateActions,
          generateInitialState,
          generateReducer,
          generateRequest: opts => new FindOneRequest(opts),
        },
        options,
      ),
    );
  }
}

export default FindManyEndpoint;
