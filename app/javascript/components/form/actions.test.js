import {
  handleInputChangeWith,
  handleSubmitWith,
} from './actions';

describe('Form actions', () => {
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

  describe('handleInputChangeWith()', () => {
    const propName = 'propertyName';
    const actionCreator = jest.fn(obj => ({ payload: obj }));
    const handleChangeProp = handleInputChangeWith(actionCreator);
    const onPropChange = handleChangeProp(propName);

    afterEach(() => actionCreator.mockClear());

    it('should be a function', () => {
      expect(typeof handleInputChangeWith).toEqual('function');
    });

    it('should return a higher-order function', () => {
      expect(typeof handleInputChangeWith(actionCreator)(propName)).toEqual('function');
    });

    describe('with a checkbox target', () => {
      const type = 'checkbox';
      const value = true;
      const event = { target: { checked: value, type } };

      it('should call the action creator', () => {
        const action = onPropChange(event);

        expect(actionCreator).toHaveBeenCalledWith({ propName, value });
        expect(action).toEqual({ payload: { propName, value } });
      });
    });

    describe('with a text input target', () => {
      const type = 'text';
      const value = 'Property Value';
      const event = { target: { type, value } };

      it('should call the action creator', () => {
        const action = onPropChange(event);

        expect(actionCreator).toHaveBeenCalledWith({ propName, value });
        expect(action).toEqual({ payload: { propName, value } });
      });
    });
  });
});
