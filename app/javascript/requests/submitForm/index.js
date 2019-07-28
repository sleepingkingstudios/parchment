import generateActions from './actions';
import generateApiActions from './apiActions';
import generateInitialState from './initialState';
import generateReducer from './reducer';

const generateFormRequest = ({ data, namespace, url }) => {
  const actions = generateActions({ namespace });
  const apiActions = generateApiActions({ actions, namespace, url });
  const initialState = generateInitialState({ data, namespace });
  const reducer = generateReducer({ actions, initialState });

  return {
    actions,
    apiActions,
    reducer,
  };
};

export default generateFormRequest;
