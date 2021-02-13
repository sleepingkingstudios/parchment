import {
  applyMiddleware,
  selectMiddleware,
} from 'api/middleware/utils';
import { formatErrors } from 'components/form/utils';
import {
  camelizeKeys,
  dig,
  valueOrDefault,
} from 'utils/object';

const extractErrors = json => valueOrDefault(
  dig(json, 'error', 'data', 'errors'),
  [],
);

const defaultHandlers = ({ actions }) => {
  const {
    requestFailure,
    requestPending,
    requestSuccess,
  } = actions;

  return {
    handleFailure: ({ dispatch, response }) => {
      const { json } = response;
      const errors = extractErrors(json);

      dispatch(requestFailure(formatErrors(errors)));
    },
    handlePending: ({ dispatch }) => {
      dispatch(requestPending());
    },
    handleSuccess: async ({ dispatch, response }) => {
      const { json } = response;

      dispatch(requestSuccess(camelizeKeys(json.data)));
    },
  };
};

const generateHandlers = ({ actions, middleware }) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = defaultHandlers({ actions });
  const actualMiddleware = valueOrDefault(middleware, []);

  return {
    handleFailure: applyMiddleware(
      handleFailure,
      selectMiddleware(actualMiddleware, 'handleFailure'),
    ),
    handlePending: applyMiddleware(
      handlePending,
      selectMiddleware(actualMiddleware, 'handlePending'),
    ),
    handleSuccess: applyMiddleware(
      handleSuccess,
      selectMiddleware(actualMiddleware, 'handleSuccess'),
    ),
  };
};

export default generateHandlers;
