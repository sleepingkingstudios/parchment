import { getInputValue } from './utils';

/* eslint-disable-next-line import/prefer-default-export */
export const handleInputChangeWith = actionCreator => (
  propName => (
    (event) => {
      const { target } = event;
      const value = getInputValue(target);

      return actionCreator({ propName, value });
    }
  )
);
