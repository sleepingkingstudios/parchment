import { handleInputChangeWith } from './actions';

describe('Form actions', () => {
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
