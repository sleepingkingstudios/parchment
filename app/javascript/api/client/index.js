import defaultGenerateActions from './actions';
import generateInitialState from './initialState';
import generateRequest from './request';
import generateSelector from './selector';
import {
  applyMiddleware,
  selectMiddleware,
} from '../middleware/utils';
import {
  exists,
  valueOrDefault,
} from '../../utils/object';

const wrapReducer = ({ middleware, reducer }) => applyMiddleware(
  reducer,
  selectMiddleware(middleware, 'handleAction'),
);

const buildClient = (options) => {
  const {
    generateHooks,
    generateReducer,
    namespace,
    url,
  } = options;
  const method = valueOrDefault(options.method, 'GET');
  const middleware = valueOrDefault(options.middleware, []);
  const actions = valueOrDefault(options.generateActions, defaultGenerateActions)({ namespace });
  const data = valueOrDefault(options.data, {});
  const initialState = generateInitialState({ data });
  const reducer = wrapReducer({
    middleware,
    reducer: generateReducer({ actions, initialState }),
  });
  const selector = valueOrDefault(options.selector, generateSelector({ namespace }));
  const request = generateRequest({
    actions,
    method,
    middleware,
    namespace,
    url,
  });
  const { performRequest } = request;
  const hooks = exists(generateHooks)
    ? generateHooks({ actions, performRequest, selector })
    : {};

  return {
    actions,
    hooks,
    namespace,
    reducer,
    request,
    selector,
  };
};

export default buildClient;
