import generateActions from './actions';
import {
  shouldGenerateTheEndpointActions,
} from './testHelpers';

describe('API endpoint actions', () => {
  const namespace = 'path/to/widgets';
  const actions = generateActions({ namespace });

  shouldGenerateTheEndpointActions({ actions, namespace });
});
