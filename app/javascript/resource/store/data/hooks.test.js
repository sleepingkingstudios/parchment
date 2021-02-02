import { useSelector } from 'react-redux';

import generateHooks from './hooks';
import { shouldGenerateTheHooks } from './testHelpers';

jest.mock('react-redux');

useSelector.mockImplementation(() => null);

describe('resource data generateHooks()', () => {
  const namespace = 'path/to/widgets';
  const hooks = generateHooks({ namespace });

  shouldGenerateTheHooks({
    hooks,
    namespace,
    useSelector,
  });
});
