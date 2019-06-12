import { getInputValue } from './utils';

export const handleInputChangeWith = actionCreator => (
  propName => (
    (event) => {
      const { target } = event;
      const value = getInputValue(target);

      return actionCreator({ propName, value });
    }
  )
);

export const handleSubmitWith = actionCreator => (
  (event) => {
    event.preventDefault();

    return actionCreator();
  }
);
