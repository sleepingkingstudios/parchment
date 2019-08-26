import defaultGenerateSelector from './selector';
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
      generateSelector,
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
    const selector = valueOrDefault(generateSelector, defaultGenerateSelector)({ namespace });

    this.actions = actions;
    this.namespace = namespace;
    this.reducer = applyMiddleware(
      reducer,
      selectMiddleware(middleware, 'handleAction'),
    );
    this.request = applyMiddlewareToRequest(request, middleware);
    this.selector = selector;
  }
}

export default ApiEndpoint;
