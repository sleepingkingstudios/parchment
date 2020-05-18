import { push } from 'connected-react-router';
import pluralize from 'pluralize';

import {
  dig,
  valueOrDefault,
} from '../../../utils/object';

const defaultSelector = resourceName => data => dig(data, resourceName);

const buildRedirect = (props) => {
  const { resourceName } = props;
  const primaryKey = valueOrDefault(props.primaryKey, 'id');
  const baseUrl = valueOrDefault(
    props.baseUrl,
    `/${pluralize(resourceName)}`,
  );
  const selector = valueOrDefault(
    props.selector,
    defaultSelector(resourceName),
  );

  return next => ({ dispatch, getState, response }) => {
    next({ dispatch, getState, response });

    const data = dig(response, 'json', 'data');
    const value = dig(selector(data), primaryKey);

    dispatch(push(`${baseUrl}/${value}`));
  };
};

const redirectToShow = (props) => {
  const { on } = props;

  if (on === 'failure') {
    return { handleFailure: buildRedirect(props) };
  }

  if (on === 'success') {
    return { handleSuccess: buildRedirect(props) };
  }

  return {};
};

export default redirectToShow;
