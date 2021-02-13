import { camelizeKeys } from 'utils/object';

import generateActions from '../actions';
import generateHandlers from './handlers';

describe('API client request generateHandlers()', () => {
  const namespace = 'path/to/widgets';
  const actions = generateActions({ namespace });

  it('should be a function', () => {
    expect(typeof generateHandlers).toEqual('function');
  });

  describe('with default options', () => {
    const handlers = generateHandlers({ actions });

    describe('handleFailure()', () => {
      const { handleFailure } = handlers;

      it('should be a function', () => {
        expect(typeof handleFailure).toEqual('function');
      });

      it('should dispatch REQUEST_FAILURE', () => {
        const dispatch = jest.fn();
        const response = {
          ok: false,
          json: {},
        };
        const action = actions.requestFailure({});

        handleFailure({ dispatch, response });

        expect(dispatch).toHaveBeenCalledWith(action);
      });

      describe('when the response has errors', () => {
        const dispatch = jest.fn();
        const errors = [
          ['cost', "can't be blank"],
          ['name', "won't fit on cargo manifest"],
          ['quantity', 'is too high'],
        ];
        const response = {
          ok: false,
          json: { error: { data: { errors } } },
        };
        const expectedErrors = {
          cost: ["can't be blank"],
          name: ["won't fit on cargo manifest"],
          quantity: ['is too high'],
        };
        const action = actions.requestFailure(expectedErrors);

        handleFailure({ dispatch, response });

        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('handlePending()', () => {
      const { handlePending } = handlers;

      it('should be a function', () => {
        expect(typeof handlePending).toEqual('function');
      });

      it('should dispatch REQUEST_FAILURE', () => {
        const dispatch = jest.fn();
        const action = actions.requestPending();

        handlePending({ dispatch });

        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('handleSuccess()', () => {
      const { handleSuccess } = handlers;

      it('should be a function', () => {
        expect(typeof handleSuccess).toEqual('function');
      });

      it('should dispatch REQUEST_SUCCESS', () => {
        const dispatch = jest.fn();
        const response = {
          ok: true,
          json: {},
        };
        const action = actions.requestSuccess({});

        handleSuccess({ dispatch, response });

        expect(dispatch).toHaveBeenCalledWith(action);
      });

      describe('when the response has data', () => {
        const dispatch = jest.fn();
        const data = {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'Self-Sealing Stem Bolt',
          cargo_type: 'Trade Goods',
          quantity: 50,
        };
        const response = {
          ok: false,
          json: { data },
        };
        const expectedData = camelizeKeys(data);
        const action = actions.requestSuccess(expectedData);

        handleSuccess({ dispatch, response });

        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });
  });

  describe('with middleware: array', () => {
    const generateMiddleware = label => next => (opts) => {
      const { dispatch } = opts;

      dispatch({ type: `${label}/before` });

      next(opts);

      dispatch({ type: `${label}/after` });
    };
    const middleware = [
      {
        handleFailure: generateMiddleware('a/failure'),
      },
      {
        handlePending: generateMiddleware('b/pending'),
      },
      {
        handleSuccess: generateMiddleware('c/success'),
      },
      {
        handleFailure: generateMiddleware('d/failure'),
        handlePending: generateMiddleware('d/pending'),
        handleSuccess: generateMiddleware('d/success'),
      },
    ];
    const handlers = generateHandlers({ actions, middleware });

    describe('handleFailure()', () => {
      const { handleFailure } = handlers;

      it('should call the middleware', () => {
        const dispatch = jest.fn();
        const response = {
          ok: false,
          json: {},
        };
        const action = actions.requestFailure({});

        handleFailure({ dispatch, response });

        expect(dispatch.mock.calls.length).toEqual(5);

        expect(dispatch.mock.calls[0]).toEqual([{ type: 'a/failure/before' }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: 'd/failure/before' }]);
        expect(dispatch.mock.calls[2]).toEqual([action]);
        expect(dispatch.mock.calls[3]).toEqual([{ type: 'd/failure/after' }]);
        expect(dispatch.mock.calls[4]).toEqual([{ type: 'a/failure/after' }]);
      });
    });

    describe('handlePending()', () => {
      const { handlePending } = handlers;

      it('should call the middleware', () => {
        const dispatch = jest.fn();
        const action = actions.requestPending();

        handlePending({ dispatch });

        expect(dispatch.mock.calls.length).toEqual(5);

        expect(dispatch.mock.calls[0]).toEqual([{ type: 'b/pending/before' }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: 'd/pending/before' }]);
        expect(dispatch.mock.calls[2]).toEqual([action]);
        expect(dispatch.mock.calls[3]).toEqual([{ type: 'd/pending/after' }]);
        expect(dispatch.mock.calls[4]).toEqual([{ type: 'b/pending/after' }]);
      });
    });

    describe('handleSuccess()', () => {
      const { handleSuccess } = handlers;

      it('should call the middleware', () => {
        const dispatch = jest.fn();
        const response = {
          ok: true,
          json: {},
        };
        const action = actions.requestSuccess({});

        handleSuccess({ dispatch, response });

        expect(dispatch.mock.calls.length).toEqual(5);

        expect(dispatch.mock.calls[0]).toEqual([{ type: 'c/success/before' }]);
        expect(dispatch.mock.calls[1]).toEqual([{ type: 'd/success/before' }]);
        expect(dispatch.mock.calls[2]).toEqual([action]);
        expect(dispatch.mock.calls[3]).toEqual([{ type: 'd/success/after' }]);
        expect(dispatch.mock.calls[4]).toEqual([{ type: 'c/success/after' }]);
      });
    });
  });
});
