/* eslint-env jest */

const updateForm = jest.fn();

const formStore = {
  hooks: {
    useForm: jest.fn(),
    useUpdateForm: jest.fn(() => updateForm),
  },
  reducer: () => ({
    data: { widget: {} },
    errors: {},
  }),
};

export default jest.fn(() => formStore);
