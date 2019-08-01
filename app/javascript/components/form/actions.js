import { getInputValue } from './utils';

export const handleInputChangeWith = actionCreator => (
  (propName, path = []) => (
    (event) => {
      const { target } = event;
      const value = getInputValue(target);

      return actionCreator({ path, propName, value });
    }
  )
);

export const handleSubmitWith = actionCreator => (
  (event) => {
    event.preventDefault();

    return actionCreator();
  }
);
