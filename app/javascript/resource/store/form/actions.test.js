import generateActions from './actions';
import {
  shouldGenerateTheActions,
} from './testHelpers';

describe('resource form store generateActions()', () => {
  const namespace = 'path/to/widgets';
  const actions = generateActions({ namespace });

  shouldGenerateTheActions({ actions, namespace });
});
