import generateRoutes from './routes';
import {
  LandingPage,
  fixtures,
} from './fixtures';
import {
  shouldGenerateTheRoutes,
} from './testHelpers';

describe('resource generateRoutes()', () => {
  it('should be a function', () => {
    expect(typeof generateRoutes).toEqual('function');
  });

  describe('with default resources', () => {
    const normalized = fixtures;
    const Routes = generateRoutes(normalized);

    shouldGenerateTheRoutes({
      Routes,
      normalized,
    });
  });

  describe('with a subset of resources', () => {
    const {
      index,
      show,
    } = fixtures;
    const normalized = {
      index,
      show,
    };
    const Routes = generateRoutes(normalized);

    shouldGenerateTheRoutes({
      Routes,
      normalized,
    });
  });

  describe('with additional pages', () => {
    const landing = {
      component: LandingPage,
      exact: true,
      options: { baseUrl: '/widgets', resourceName: 'widget' },
      path: '/landing',
      reducer: null,
    };
    const normalized = {
      ...fixtures,
      landing,
    };
    const Routes = generateRoutes(normalized);

    shouldGenerateTheRoutes({
      Routes,
      normalized,
    });
  });

  describe('with an additional page with multiword path', () => {
    const landing = {
      component: LandingPage,
      exact: true,
      options: { baseUrl: '/widgets', resourceName: 'widget' },
      path: '/landing-page',
      reducer: null,
    };
    const normalized = {
      ...fixtures,
      landing,
    };
    const Routes = generateRoutes(normalized);

    shouldGenerateTheRoutes({
      Routes,
      normalized,
    });
  });
});
