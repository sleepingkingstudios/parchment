import { handleChangeEvent } from './actions';

describe('Form actions', () => {
  describe('handleChangeEvent()', () => {
    const actionCreator = jest.fn(obj => ({ payload: obj }));
    const propName = 'property-name';
    const value = 'Property Value';
    const dataset = { propName };
    const target = { dataset, value };
    const event = { target };
    const handler = handleChangeEvent(actionCreator);

    it('should be a function', () => {
      expect(typeof handleChangeEvent).toEqual('function');
    });

    it('should return a function', () => {
      expect(typeof handleChangeEvent(actionCreator)).toEqual('function');
    });

    it('should call the action creator', () => {
      handler(event);

      expect(actionCreator).toHaveBeenCalledWith({ propName, value });
    });

    it('should return the created action', () => {
      const action = handler(event);

      expect(action).toEqual({ payload: { propName, value } });
    });

    describe('with a checkbox target', () => {
      const checked = true;
      const type = 'checkbox';
      const checkboxTarget = { checked, dataset, type };
      const checkboxEvent = { target: checkboxTarget };

      it('should call the action creator', () => {
        handler(checkboxEvent);

        expect(actionCreator).toHaveBeenCalledWith({ propName, value: checked });
      });

      it('should return the created action', () => {
        const action = handler(checkboxEvent);

        expect(action).toEqual({ payload: { propName, value: checked } });
      });
    });
  });
});
