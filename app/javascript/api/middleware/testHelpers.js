/* eslint-env jest */

import { injectMiddleware } from './utils';
import { valueOrDefault } from '../../utils/object';

export const shouldCallTheNextFunction = (fn, props, expected) => {
  it('should call the next function', () => {
    const next = jest.fn();

    fn(next)(props);

    expect(next).toHaveBeenCalledWith(valueOrDefault(expected, props));
  });
};

export const shouldInjectTheMiddleware = ({ directives, middleware, original }) => {
  it('should inject the middleware', () => {
    const expected = injectMiddleware(original, directives);
    const expectedTypes = expected.map(item => item.type);
    const actualTypes = middleware.map(item => item.type);

    expect(actualTypes).toEqual(expectedTypes);
  });
};
