import { getInputValue } from './utils';
import { valueOrDefault } from '../../utils/object';

export const handleInputChangeWith = (actionCreator, mapValueToData) => (
  ({ propName, path }) => (
    (event) => {
      const actualPath = valueOrDefault(path, []);
      const { target } = event;
      const value = getInputValue(target);
      const data = mapValueToData({ prop: propName, value });

      return actionCreator({ data, path: actualPath });
    }
  )
);

export const handleSubmitWith = actionCreator => (
  (event) => {
    event.preventDefault();

    return actionCreator();
  }
);
