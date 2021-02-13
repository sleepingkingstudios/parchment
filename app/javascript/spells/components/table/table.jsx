import IndexPageTable from 'resource/components/table';
import { injectProps } from 'utils/react';

import columns from './columns';

import './spells-table-styles.css';

const SpellsPageTable = injectProps(
  IndexPageTable,
  { columns },
);

export default SpellsPageTable;
