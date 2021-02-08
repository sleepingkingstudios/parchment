import generateHooks from './hooks';
import generateReducer from './reducer';

const buildStore = (options) => {
  const hooks = generateHooks(options);
  const reducer = generateReducer(options);

  return {
    hooks,
    options,
    reducer,
    type: 'resources/store/data',
  };
};

export default buildStore;
