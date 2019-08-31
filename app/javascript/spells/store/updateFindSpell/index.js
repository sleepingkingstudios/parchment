import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import redirect from './redirect';
import { buildSpell } from '../../entities';
import { actions as formActions } from '../updateSpellForm';

const REQUEST_URL = '/api/spells/:id';
const endpoint = new FindOneEndpoint({
  data: { spell: buildSpell() },
  middleware: [
    {
      handleSuccess: next => ({ dispatch, getState, response }) => {
        next({ dispatch, getState, response });

        const { spells } = getState();
        const { updateFindSpell } = spells;
        const { data } = updateFindSpell;
        const { setData } = formActions;

        dispatch(setData(data));
      },
    },
    redirect,
    alerts,
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
