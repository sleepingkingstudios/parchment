import {
  applyMiddleware,
  selectMiddleware,
} from '../middleware/utils';
import { valueOrDefault } from '../../utils/object';

const applyMiddlewareToRequest = (request, middleware) => {
  request.handleFailure = applyMiddleware(
    request.handleFailure,
    selectMiddleware(middleware, 'handleFailure'),
  );
  request.handleSuccess = applyMiddleware(
    request.handleSuccess,
    selectMiddleware(middleware, 'handleSuccess'),
  );

  return request;
};

class ApiEndpoint {
  constructor(options) {
    const {
      generateActions,
      generateInitialState,
      generateReducer,
      generateRequest,
      method,
      middleware,
      namespace,
      url,
    } = options;
    const actions = generateActions({ namespace });
    const data = valueOrDefault(options.data, {});
    const initialState = generateInitialState({ data });
    const reducer = generateReducer({ actions, initialState });
    const request = generateRequest({
      actions,
      method,
      namespace,
      url,
    });

    this.actions = actions;
    this.namespace = namespace;
    this.reducer = applyMiddleware(
      reducer,
      selectMiddleware(middleware, 'handleAction'),
    );
    this.request = applyMiddlewareToRequest(request, middleware);
  }
}

export default ApiEndpoint;
