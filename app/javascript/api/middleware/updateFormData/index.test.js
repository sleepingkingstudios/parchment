import updateFormData from './index';
import {
  shouldCallTheNextFunction,
} from '../testHelpers';

describe('updateFormData middleware', () => {
  const actions = { setFormData: data => ({ type: 'test/setFormData', payload: data }) };
  const namespace = 'path/to/widgets/updateWidgetForm';
  const formEndpoint = { actions, namespace };

  it('should be a function', () => {
    expect(typeof updateFormData).toEqual('function');
  });

  describe('with default options', () => {
    const middleware = updateFormData({ formEndpoint });

    describe('handleSuccess()', () => {
      const { handleSuccess } = middleware;
      const data = { widget: { name: 'Self-sealing Stem Bolt' } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
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

      it('should dispatch setFormData', () => {
        const next = jest.fn();
        const action = actions.setFormData(data);

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(middleware.options).toEqual({ namespace });
      });
    });

    describe('type', () => {
      it('should return api/updateFormData', () => {
        expect(middleware.type).toEqual('api/updateFormData');
      });
    });
  });

  describe('with mapData: function', () => {
    const mapData = data => ({ gadget: data.widget });
    const middleware = updateFormData({ formEndpoint, mapData });

    describe('handleSuccess()', () => {
      const { handleSuccess } = middleware;
      const data = { widget: { name: 'Self-sealing Stem Bolt' } };
      const props = {
        dispatch: jest.fn(),
        getState: jest.fn(),
        response: { json: { data } },
      };

      afterEach(() => { props.dispatch.mockClear(); });

      it('should dispatch setFormData', () => {
        const next = jest.fn();
        const action = actions.setFormData(mapData(data));

        handleSuccess(next)(props);

        expect(props.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('options', () => {
      it('should return the options', () => {
        expect(middleware.options).toEqual({ mapData, namespace });
      });
    });
  });
});
