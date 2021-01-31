import { shallowEqual, useSelector } from 'react-redux';

import generateHooks from './hooks';

jest.mock('react-redux');

useSelector.mockImplementation(() => null);

describe('API data hooks', () => {
  const namespace = 'path/to/widgets';
  const hooks = generateHooks({ namespace });
  const { useData } = hooks;

  beforeEach(() => { useSelector.mockClear(); });

  describe('useData()', () => {
    it('should be a function', () => {
      expect(typeof useData).toEqual('function');
    });

    it('should delegate to useSelector()', () => {
      useData();

      expect(useSelector).toHaveBeenCalledWith(
        expect.any(Function),
        shallowEqual,
      );
    });

    describe('when the state does not have data matching the selector', () => {
      beforeEach(() => {
        useSelector.mockImplementationOnce(selector => selector({}));
      });

      it('should return null', () => {
        expect(useData()).toEqual(null);
      });
    });

    describe('when the state has data matching the selector', () => {
      const data = { widgets: [] };
      const state = { path: { to: { widgets: { data } } } };

      beforeEach(() => {
        useSelector.mockImplementationOnce(selector => selector(state));
      });

      it('should return the matching data', () => {
        expect(useData()).toEqual(data);
      });
    });
  });
});
