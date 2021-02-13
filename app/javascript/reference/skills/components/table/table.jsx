import IndexPageTable from 'resource/components/table';
import { injectProps } from 'utils/react';

import columns from './columns';

const SkillsPageTable = injectProps(
  IndexPageTable,
  { columns },
);

export default SkillsPageTable;
