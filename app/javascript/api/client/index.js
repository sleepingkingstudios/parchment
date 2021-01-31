import {
  applyMiddleware,
  selectMiddleware,
} from 'api/middleware/utils';
import {
  valueOrDefault,
} from 'utils/object';

import generateActions from './actions';
import generateHooks from './hooks';
import generateInitialState from './initialState';
import generateReducer from './reducer';
import generateRequest from './request';
import generateSelector from './selector';

const wrapReducer = ({ middleware, reducer }) => applyMiddleware(
  reducer,
  selectMiddleware(middleware, 'handleAction'),
);

const buildClient = (options) => {
  const {
    namespace,
    url,
  } = options;
  const data = valueOrDefault(options.data, {});
  const method = valueOrDefault(options.method, 'GET');
  const middleware = valueOrDefault(options.middleware, []);

  const actions = generateActions({ namespace });
  const initialState = generateInitialState({ data });
  const performRequest = generateRequest({
    actions,
    method,
    middleware,
    namespace,
    url,
  });
  const hooks = generateHooks({ performRequest });
  const reducer = wrapReducer({
    middleware,
    reducer: generateReducer({ actions, initialState }),
  });
  const selector = generateSelector({ namespace });

  return {
    actions,
    hooks,
    method,
    middleware,
    namespace,
    performRequest,
    reducer,
    selector,
    url,
  };
};

export default buildClient;
