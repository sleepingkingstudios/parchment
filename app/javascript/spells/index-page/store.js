import buildStore from 'resource/pages/index-page/store';

const namespace = 'spells/index';
const resourceName = 'spells';
const url = 'api/spells';

const store = buildStore({
  namespace,
  resourceName,
  url,
});
const {
  hooks,
  reducer,
} = store;

export default store;

export {
  hooks,
  reducer,
};
