import {
  FAILURE,
  INITIALIZED,
  PENDING,
  SUCCESS,
} from './status';

describe('API request status', () => {
  describe('FAILURE', () => {
    it('should equal "failure"', () => {
      expect(FAILURE).toEqual('failure');
    });
  });

  describe('INITIALIZED', () => {
    it('should equal "initialized"', () => {
      expect(INITIALIZED).toEqual('initialized');
    });
  });

  describe('PENDING', () => {
    it('should equal "pending"', () => {
      expect(PENDING).toEqual('pending');
    });
  });

  describe('SUCCESS', () => {
    it('should equal "success"', () => {
      expect(SUCCESS).toEqual('success');
    });
  });
});
