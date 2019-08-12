import generateActions from '../endpoint/actions';
import generateInitialState from '../endpoint/initialState';
import generateReducer from './reducer';
import FindOneRequest from './request';

import {
  applyMiddleware,
  selectMiddleware,
} from '../middleware/utils';

const generateFindOneRequest = ({
  data,
  middleware,
  namespace,
  url,
}) => {
  const actions = generateActions({ namespace });
  const request = new FindOneRequest({ actions, namespace, url });
  const initialState = generateInitialState({ data, namespace });
  const reducer = applyMiddleware(
    generateReducer({ actions, initialState }),
    selectMiddleware(middleware, 'handleAction'),
  );

  request.handleFailure = applyMiddleware(
    request.handleFailure,
    selectMiddleware(middleware, 'handleFailure'),
  );
  request.handleSuccess = applyMiddleware(
    request.handleSuccess,
    selectMiddleware(middleware, 'handleSuccess'),
  );

  return {
    actions,
    namespace,
    reducer,
    request,
  };
};

export default generateFindOneRequest;
