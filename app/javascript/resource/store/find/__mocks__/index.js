/* eslint-env jest */

import { SUCCESS } from 'api/status';

const findClient = {
  actions: { REQUEST_SUCCESS: 'test/requestSuccess' },
  hooks: {
    useStatus: jest.fn(),
  },
  performRequest: jest.fn(),
  reducer: () => ({
    data: { widgets: [] },
    errors: {},
    status: SUCCESS,
  }),
};

export default jest.fn(() => findClient);
