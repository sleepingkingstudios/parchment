import alerts from './index';
import { addAlert } from '../../../alerts/store/actions';
import { valueOrDefault } from '../../../utils/object';
import { generateFingerprintUuid } from '../../../utils/uuid';

const shouldAddAlert = (fn, props, expected) => {
  it('should add an alert', () => {
    const next = jest.fn();
    const action = addAlert(expected);
    const { dispatch } = props;

    fn(next)(props);

    expect(dispatch).toHaveBeenCalledWith(action);
  });
};

const shouldCallTheNextFunction = (fn, props, expected) => {
  it('should call the next function', () => {
    const next = jest.fn();

    fn(next)(props);

    expect(next).toHaveBeenCalledWith(valueOrDefault(expected, props));
  });
};

describe('Alerts middleware', () => {
  it('should be a function', () => {
    expect(typeof alerts).toEqual('function');
  });

  describe('with no arguments', () => {
    it('should return an empty object', () => {
      expect(alerts({})).toEqual({});
    });
  });

  describe('with failure: true', () => {
    const middleware = alerts({ failure: true });
    const { handleFailure } = middleware;

    it('should not define handlePending()', () => {
      expect(middleware.handlePending).toBeUndefined();
    });

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handleFailure()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handleFailure).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleFailure(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleFailure, props);

      shouldAddAlert(handleFailure, props, {
        id: generateFingerprintUuid('resources/process'),
        alertStyle: 'warning',
        dismissible: true,
        message: 'Unable to process resource.',
      });
    });
  });

  describe('with failure: an object with message: value', () => {
    const message = 'Operation failed.';
    const middleware = alerts({ failure: { message } });
    const { handleFailure } = middleware;

    it('should not define handlePending()', () => {
      expect(middleware.handlePending).toBeUndefined();
    });

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handleFailure()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handleFailure).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleFailure(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleFailure, props);

      shouldAddAlert(handleFailure, props, {
        id: generateFingerprintUuid('resources/process'),
        alertStyle: 'warning',
        dismissible: true,
        message,
      });
    });
  });

  describe('with pending: true', () => {
    const middleware = alerts({ pending: true });
    const { handlePending } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handlePending()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handlePending).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handlePending(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handlePending, props);

      shouldAddAlert(handlePending, props, {
        id: generateFingerprintUuid('resources/process'),
        alertStyle: 'info',
        dismissible: true,
        message: 'Processing resource...',
      });
    });
  });

  describe('with pending: an object with message: value', () => {
    const message = 'Operation pending...';
    const middleware = alerts({ pending: { message } });
    const { handlePending } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    it('should not define handleSuccess()', () => {
      expect(middleware.handleSuccess).toBeUndefined();
    });

    describe('handlePending()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handlePending).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handlePending(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handlePending, props);

      shouldAddAlert(handlePending, props, {
        id: generateFingerprintUuid('resources/process'),
        alertStyle: 'info',
        dismissible: true,
        message,
      });
    });
  });

  describe('with success: true', () => {
    const middleware = alerts({ success: true });
    const { handleSuccess } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    it('should not define handlePending()', () => {
      expect(middleware.handlePending).toBeUndefined();
    });

    describe('handleSuccess()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleSuccess, props);

      shouldAddAlert(handleSuccess, props, {
        id: generateFingerprintUuid('resources/process'),
        alertStyle: 'success',
        dismissible: true,
        message: 'Successfully processed resource.',
      });
    });
  });

  describe('with success: an object with message: value', () => {
    const message = 'Operation successful';
    const middleware = alerts({ success: { message } });
    const { handleSuccess } = middleware;

    it('should not define handleFailure()', () => {
      expect(middleware.handleFailure).toBeUndefined();
    });

    it('should not define handlePending()', () => {
      expect(middleware.handlePending).toBeUndefined();
    });

    describe('handleSuccess()', () => {
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: {},
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should return a function', () => {
        const next = jest.fn();

        expect(typeof handleSuccess(next)).toEqual('function');
      });

      shouldCallTheNextFunction(handleSuccess, props);

      shouldAddAlert(handleSuccess, props, {
        id: generateFingerprintUuid('resources/process'),
        alertStyle: 'success',
        dismissible: true,
        message,
      });
    });
  });

  describe('with multiple handlers', () => {
    const middleware = alerts({ failure: true, pending: true, success: true });
    const {
      handleFailure,
      handlePending,
      handleSuccess,
    } = middleware;

    describe('handleFailure()', () => {
      it('should be a function', () => {
        expect(typeof handleFailure).toEqual('function');
      });
    });

    describe('handlePending()', () => {
      it('should be a function', () => {
        expect(typeof handlePending).toEqual('function');
      });
    });

    describe('handleSuccess()', () => {
      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });
    });
  });

  describe('with action: value and resourceName: value', () => {
    const action = 'update';
    const resourceName = 'widget';

    describe('with failure: true', () => {
      const middleware = alerts({ action, resourceName, failure: true });
      const { handleFailure } = middleware;

      describe('handleFailure()', () => {
        const props = {
          dispatch: jest.fn(),
          getState: jest.fn(),
          response: {},
        };

        afterEach(() => { props.dispatch.mockClear(); });

        shouldAddAlert(handleFailure, props, {
          id: generateFingerprintUuid('widgets/update'),
          alertStyle: 'warning',
          dismissible: true,
          message: 'Unable to update widget.',
        });
      });
    });

    describe('with failure: an object with message: value', () => {
      const message = 'Operation failed.';
      const middleware = alerts({ action, resourceName, failure: { message } });
      const { handleFailure } = middleware;

      describe('handleFailure()', () => {
        const props = {
          dispatch: jest.fn(),
          getState: jest.fn(),
          response: {},
        };

        afterEach(() => { props.dispatch.mockClear(); });

        shouldAddAlert(handleFailure, props, {
          id: generateFingerprintUuid('widgets/update'),
          alertStyle: 'warning',
          dismissible: true,
          message,
        });
      });
    });

    describe('with pending: true', () => {
      const middleware = alerts({ action, resourceName, pending: true });
      const { handlePending } = middleware;

      describe('handlePending()', () => {
        const props = {
          dispatch: jest.fn(),
          getState: jest.fn(),
          response: {},
        };

        afterEach(() => { props.dispatch.mockClear(); });

        shouldAddAlert(handlePending, props, {
          id: generateFingerprintUuid('widgets/update'),
          alertStyle: 'info',
          dismissible: true,
          message: 'Updating widget...',
        });
      });
    });

    describe('with pending: an object with message: value', () => {
      const message = 'Operation pending...';
      const middleware = alerts({ action, resourceName, pending: { message } });
      const { handlePending } = middleware;

      describe('handleFailure()', () => {
        const props = {
          dispatch: jest.fn(),
          getState: jest.fn(),
          response: {},
        };

        afterEach(() => { props.dispatch.mockClear(); });

        shouldAddAlert(handlePending, props, {
          id: generateFingerprintUuid('widgets/update'),
          alertStyle: 'info',
          dismissible: true,
          message,
        });
      });
    });

    describe('with success: true', () => {
      const middleware = alerts({ action, resourceName, success: true });
      const { handleSuccess } = middleware;

      describe('handleSuccess()', () => {
        const props = {
          dispatch: jest.fn(),
          getState: jest.fn(),
          response: {},
        };

        afterEach(() => { props.dispatch.mockClear(); });

        shouldAddAlert(handleSuccess, props, {
          id: generateFingerprintUuid('widgets/update'),
          alertStyle: 'success',
          dismissible: true,
          message: 'Successfully updated widget.',
        });
      });
    });

    describe('with success: an object with message: value', () => {
      const message = 'Operation successful.';
      const middleware = alerts({ action, resourceName, success: { message } });
      const { handleSuccess } = middleware;

      describe('handleSuccess()', () => {
        const props = {
          dispatch: jest.fn(),
          getState: jest.fn(),
          response: {},
        };

        afterEach(() => { props.dispatch.mockClear(); });

        shouldAddAlert(handleSuccess, props, {
          id: generateFingerprintUuid('widgets/update'),
          alertStyle: 'success',
          dismissible: true,
          message,
        });
      });
    });
  });
});
