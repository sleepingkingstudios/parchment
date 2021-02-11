import generateReducer from './reducer';
import {
  LandingPage,
  fixtures,
} from './fixtures';
import {
  shouldGenerateTheReducer,
} from './testHelpers';

describe('resource generateReducer()', () => {
  it('should be a function', () => {
    expect(typeof generateReducer).toEqual('function');
  });

  describe('with resources that do not have reducers', () => {
    const resources = {
      landing: {
        component: LandingPage,
        exact: true,
        path: '/landing',
      },
    };
    const reducer = generateReducer(resources);

    it('should return null', () => {
      expect(reducer).toEqual(null);
    });
  });

  describe('with resources that have reducers', () => {
    const normalized = fixtures;
    const reducer = generateReducer(normalized);

    shouldGenerateTheReducer({
      normalized,
      reducer,
    });
  });
});
