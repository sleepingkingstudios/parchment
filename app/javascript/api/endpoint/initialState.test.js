import generateInitialState from './initialState';
import { INITIALIZED } from '../../store/requestStatus';

describe('API endpoint initial state', () => {
  it('should be a function', () => {
    expect(typeof generateInitialState).toEqual('function');
  });

  describe('with no arguments', () => {
    const {
      data,
      errors,
      status,
    } = generateInitialState();

    it('should set the data to an empty object', () => {
      expect(data).toEqual({});
    });

    it('should set the errors to an empty object', () => {
      expect(errors).toEqual({});
    });

    it('should set the request status to "initialized"', () => {
      expect(status).toEqual(INITIALIZED);
    });
  });

  describe('with data: empty object', () => {
    const {
      data,
      errors,
      status,
    } = generateInitialState({ data: {} });

    it('should set the data to an empty object', () => {
      expect(data).toEqual({});
    });

    it('should set the errors to an empty object', () => {
      expect(errors).toEqual({});
    });

    it('should set the request status to "initialized"', () => {
      expect(status).toEqual(INITIALIZED);
    });
  });

  describe('with data: value', () => {
    const initialData = { name: 'Westley' };
    const {
      data,
      errors,
      status,
    } = generateInitialState({ data: initialData });

    it('should set the data to the specified value', () => {
      expect(data).toEqual(initialData);
    });

    it('should set the errors to an empty object', () => {
      expect(errors).toEqual({});
    });

    it('should set the request status to "initialized"', () => {
      expect(status).toEqual(INITIALIZED);
    });
  });
});
