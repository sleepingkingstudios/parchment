import IndexPageTable from 'resource/components/table';
import { injectProps } from 'utils/react';

import columns from './columns';

const ItemsPageTable = injectProps(
  IndexPageTable,
  { columns },
);

export default ItemsPageTable;
