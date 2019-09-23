import {
  handleInputChangeWith,
  handleSubmitWith,
} from './actions';
import { assign } from '../../utils/object';

describe('Form actions', () => {
  describe('handleInputChangeWith()', () => {
    const propName = 'propertyName';
    const mapValueToData = jest.fn(
      ({ prop, value }) => assign({}, value, prop),
    );

    beforeEach(() => { mapValueToData.mockClear(); });

    it('should be a function', () => {
      expect(typeof handleInputChangeWith).toEqual('function');
    });

    it('should return a higher-order function', () => {
      const actionCreator = jest.fn(obj => ({ payload: obj }));

      expect(typeof handleInputChangeWith(actionCreator)(propName)).toEqual('function');
    });

    describe('with a checkbox target', () => {
      const type = 'checkbox';
      const value = true;
      const event = { target: { checked: value, type } };

      it('should call the action creator', () => {
        const actionCreator = jest.fn(obj => ({ payload: obj }));
        const handleChangeProp = handleInputChangeWith(actionCreator, mapValueToData);
        const onPropChange = handleChangeProp({ propName });
        const action = onPropChange(event);
        const payload = { data: { propertyName: value }, path: [] };

        expect(mapValueToData).toHaveBeenCalledWith({ prop: propName, value });
        expect(actionCreator).toHaveBeenCalledWith(payload);
        expect(action).toEqual({ payload });
      });
    });

    describe('with a text input target', () => {
      const type = 'text';
      const value = 'Property Value';
      const event = { target: { type, value } };

      it('should call the action creator', () => {
        const actionCreator = jest.fn(obj => ({ payload: obj }));
        const handleChangeProp = handleInputChangeWith(actionCreator, mapValueToData);
        const onPropChange = handleChangeProp({ propName });
        const action = onPropChange(event);
        const payload = { data: { propertyName: value }, path: [] };

        expect(mapValueToData).toHaveBeenCalledWith({ prop: propName, value });
        expect(actionCreator).toHaveBeenCalledWith(payload);
        expect(action).toEqual({ payload });
      });
    });

    describe('with path: array', () => {
      const path = ['ancestor', 'grandparent', 'parent'];

      describe('with a checkbox target', () => {
        const type = 'checkbox';
        const value = true;
        const event = { target: { checked: value, type } };

        it('should call the action creator', () => {
          const actionCreator = jest.fn(obj => ({ payload: obj }));
          const handleChangeProp = handleInputChangeWith(actionCreator, mapValueToData);
          const onPropChange = handleChangeProp({ propName, path });
          const action = onPropChange(event);
          const payload = { data: { propertyName: value }, path };

          expect(mapValueToData).toHaveBeenCalledWith({ prop: propName, value });
          expect(actionCreator).toHaveBeenCalledWith(payload);
          expect(action).toEqual({ payload });
        });
      });

      describe('with a text input target', () => {
        const type = 'text';
        const value = 'Property Value';
        const event = { target: { type, value } };

        it('should call the action creator', () => {
          const actionCreator = jest.fn(obj => ({ payload: obj }));
          const handleChangeProp = handleInputChangeWith(actionCreator, mapValueToData);
          const onPropChange = handleChangeProp({ propName, path });
          const action = onPropChange(event);
          const payload = { data: { propertyName: value }, path };

          expect(mapValueToData).toHaveBeenCalledWith({ prop: propName, value });
          expect(actionCreator).toHaveBeenCalledWith(payload);
          expect(action).toEqual({ payload });
        });
      });
    });
  });

  describe('handleSubmitWith()', () => {
    const actionCreator = jest.fn(() => ({ payload: {} }));
    const onSubmit = handleSubmitWith(actionCreator);
    const event = { preventDefault: jest.fn() };

    afterEach(() => actionCreator.mockClear());

    it('should be a function', () => {
      expect(typeof handleSubmitWith).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof handleSubmitWith(actionCreator)).toEqual('function');
    });

    it('should call the action creator', () => {
      const action = onSubmit(event);

      expect(actionCreator).toHaveBeenCalled();
      expect(action).toEqual({ payload: {} });
    });

    it('should prevent the default behavior', () => {
      onSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
