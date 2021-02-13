/* eslint-env jest */

const dataStore = {
  hooks: {
    useData: jest.fn(),
  },
  reducer: () => ({ data: { widgets: [] } }),
};

export default jest.fn(() => dataStore);
