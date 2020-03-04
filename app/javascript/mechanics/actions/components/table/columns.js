import ActionsTableActions from './actions';
import { columns as mechanicsColumns } from '../../../components/table';

const columns = mechanicsColumns.slice();

columns[columns.length - 1] = {
  label: ' ',
  prop: 'actions',
  value: ActionsTableActions,
};

export default columns;
