import updateForm from '../../../api/resources/updateForm';
import { buildBook } from '../../entities';

const endpoint = updateForm({
  data: { book: buildBook() },
  resourceName: 'book',
});

export default endpoint;

export const {
  actions,
  hooks,
  reducer,
  request,
} = endpoint;
