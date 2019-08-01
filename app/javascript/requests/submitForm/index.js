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
  middleware,
  namespace,
  url,
}) => {
  const actions = generateActions({ namespace });
  const request = new FormRequest({ actions, namespace, url });
  const initialState = generateInitialState({ data, namespace });
  const reducer = generateReducer({ actions, initialState });

  return {
    actions,
    reducer: applyMiddleware(reducer, selectMiddleware(middleware, 'handleAction')),
    request,
  };
};

export default generateFormRequest;
