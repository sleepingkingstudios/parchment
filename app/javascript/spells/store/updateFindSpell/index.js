import FindOneEndpoint from '../../../api/findOne';
import collectAssociations from '../../../api/middleware/collectAssociations';
import alerts from './alerts';
import redirect from './redirect';
import { buildSpell } from '../../entities';
import { actions as formActions } from '../updateSpellForm';

const REQUEST_URL = '/api/spells/:id';
const collectSource = collectAssociations({
  associationName: 'source',
  associationType: 'hasOne',
  inverseName: 'reference',
  polymorphic: true,
  resourceName: 'spell',
});
const endpoint = new FindOneEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    {
      handleSuccess: next => ({ dispatch, getState, response }) => {
        next({ dispatch, getState, response });

        const { spells } = getState();
        const { updateFindSpell } = spells;
        const { data } = updateFindSpell;
        const { setFormData } = formActions;

        dispatch(setFormData(data));
      },
    },
    redirect,
    alerts,
    collectSource,
  ],
  namespace: 'spells/updateFindSpell',
  url: REQUEST_URL,
});

export default endpoint;

export const {
  actions,
  hooks,
  namespace,
  reducer,
  request,
} = endpoint;
