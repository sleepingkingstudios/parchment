import generateSelector from './selector';
import {
  shouldGenerateTheSelector,
} from './testHelpers';

describe('generateSelector()', () => {
  const namespace = 'path/to/widgets';
  const selector = generateSelector({ namespace });

  shouldGenerateTheSelector({ namespace, selector });
});
