import FindOneEndpoint from '../../../api/findOne';
import alerts from './alerts';
import redirect from './redirect';
import { buildPublication } from '../../entities';
import { actions as formActions } from '../updatePublicationForm';

const REQUEST_URL = '/api/publications/:id';
const endpoint = new FindOneEndpoint({
  data: { publication: buildPublication() },
  middleware: [
    {
      handleSuccess: next => ({ dispatch, getState, response }) => {
        next({ dispatch, getState, response });

        const { publications } = getState();
        const { updateFindPublication } = publications;
        const { data } = updateFindPublication;
        const { setData } = formActions;

        dispatch(setData(data));
      },
    },
    redirect,
    alerts,
  ],
  namespace: 'publications/showFindPublication',
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
