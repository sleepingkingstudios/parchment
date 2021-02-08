import generateActions from './actions';
import generateHooks from './hooks';
import generateReducer from './reducer';

const buildStore = (options) => {
  const actions = generateActions(options);
  const hooks = generateHooks({ ...options, actions });
  const reducer = generateReducer({ ...options, actions });

  return {
    hooks,
    options,
    reducer,
    type: 'resource/store/form',
  };
};

export default buildStore;
