import alerts from './alerts';
import redirect from './redirect';
import findOne from '../../../../requests/findOne';
import { buildSpell } from '../../../entities';
import { actions as formActions } from '../form/index';

const REQUEST_URL = '/api/spells/:id';
const findSpell = findOne({
  data: { spell: buildSpell() },
  middleware: [
    {
      handleSuccess: next => ({ dispatch, getState, response }) => {
        next({ dispatch, getState, response });

        const { updateSpellFind } = getState();
        const { data } = updateSpellFind;
        const { setData } = formActions;

        dispatch(setData(data));
      },
    },
    redirect,
    alerts,
  ],
  namespace: 'updateSpellFind',
  url: REQUEST_URL,
});

export default findSpell;

export const {
  actions,
  namespace,
  reducer,
  request,
} = findSpell;
