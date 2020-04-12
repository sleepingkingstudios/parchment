import FindOneEndpoint from '../../../../api/findOne';
import alerts from './alerts';
import redirect from './redirect';
import { buildMechanic } from '../../../entities';
import { actions as formActions } from '../updateActionForm';

const buildAction = () => Object.assign(buildMechanic(), { type: 'Mechanics::Action' });
const REQUEST_URL = '/api/mechanics/actions/:id';
const endpoint = new FindOneEndpoint({
  data: { mechanic: buildAction() },
  middleware: [
    {
      handleSuccess: next => ({ dispatch, getState, response }) => {
        next({ dispatch, getState, response });

        const { mechanics } = getState();
        const { actions } = mechanics;
        const { updateFindAction } = actions;
        const { data } = updateFindAction;
        const { action } = data;
        const mappedData = Object.assign({}, data, { mechanic: action });
        const { setFormData } = formActions;

        delete mappedData.action;

        dispatch(setFormData(mappedData));
      },
    },
    redirect,
    alerts,
  ],
  namespace: 'mechanics/actions/updateFindAction',
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
