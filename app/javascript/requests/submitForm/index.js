import generateActions from './actions';
import generateApiActions from './apiActions';
import generateInitialState from './initialState';
import generateReducer from './reducer';

import {
  applyMiddleware,
  selectMiddleware,
} from '../middleware/utils';

const generateFormRequest = ({
  data,
  middleware,
  namespace,
  url,
}) => {
  const actions = generateActions({ namespace });
  const apiActions = generateApiActions({ actions, namespace, url });
  const initialState = generateInitialState({ data, namespace });
  const reducer = generateReducer({ actions, initialState });

  return {
    actions,
    apiActions,
    reducer: applyMiddleware(reducer, selectMiddleware(middleware, 'handleAction')),
  };
};

export default generateFormRequest;
