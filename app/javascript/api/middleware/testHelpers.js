/* eslint-env jest */

import { valueOrDefault } from '../../utils/object';

/* eslint-disable-next-line import/prefer-default-export */
export const shouldCallTheNextFunction = (fn, props, expected) => {
  it('should call the next function', () => {
    const next = jest.fn();

    fn(next)(props);

    expect(next).toHaveBeenCalledWith(valueOrDefault(expected, props));
  });
};
