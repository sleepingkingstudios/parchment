import generateActions from './actions';
import generateInitialState from './initialState';
import generateReducer from './reducer';
import FormRequest from './request';

import {
  applyMiddleware,
  selectMiddleware,
} from '../middleware/utils';

const generateFormRequest = ({
  data,
  method,
  middleware,
  namespace,
  url,
}) => {
  const actions = generateActions({ namespace });
  const request = new FormRequest({
    actions,
    method,
    namespace,
    url,
  });
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
    reducer,
    request,
  };
};

export default generateFormRequest;
