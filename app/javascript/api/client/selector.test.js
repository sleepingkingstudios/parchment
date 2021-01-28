import generateSelector from './selector';
import {
  shouldGenerateTheSelector,
} from './testHelpers';

describe('API client generateSelector()', () => {
  const namespace = 'path/to/widgets';
  const selector = generateSelector({ namespace });

  shouldGenerateTheSelector({ namespace, selector });
});
