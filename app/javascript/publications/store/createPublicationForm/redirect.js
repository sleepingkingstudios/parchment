import { push } from 'connected-react-router';

export default {
  handleSuccess: next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const { json } = response;
    const { data } = json;
    const { publication } = data;

    const publicationUrl = `/publications/${publication.id}`;

    dispatch(push(publicationUrl));
  },
};
