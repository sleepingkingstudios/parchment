import { useEffect } from 'react';

import render from './render';
import { useLiquid } from './hooks';

jest.mock('react');
jest.mock('./render');

describe('RichText liquid hooks', () => {
  const template = 'Greetings, programs!';

  beforeEach(() => {
    useEffect.mockClear();

    useEffect.mockImplementation(fn => fn());
  });

  describe('useLiquid()', () => {
    it('should be a function', () => {
      expect(typeof useLiquid).toEqual('function');
    });

    it('should call render', () => {
      const callback = jest.fn();
      const status = { active: true };

      useLiquid({ callback, template });

      expect(render).toHaveBeenCalledWith({ callback, status, template });
    });

    it('should call useEffect', () => {
      const callback = jest.fn();

      useLiquid({ callback, template });

      expect(useEffect).toHaveBeenCalled();
    });

    it('should return a function to useEffect', () => {
      let cleanup;

      useEffect.mockImplementationOnce((fn) => {
        cleanup = fn();
      });

      const callback = jest.fn();

      useLiquid({ callback, template });

      expect(typeof cleanup).toEqual('function');
    });

    it('should abort the callback', () => {
      let yieldedStatus;
      let cleanup;

      useEffect.mockImplementationOnce((fn) => {
        cleanup = fn();
      });

      render.mockImplementationOnce(({ status }) => {
        yieldedStatus = status;
      });

      const callback = jest.fn();

      useLiquid({ callback, template });

      expect(yieldedStatus).toEqual({ active: true });

      cleanup();

      expect(yieldedStatus).toEqual({ active: false });
    });
  });
});
