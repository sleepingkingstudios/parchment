import React from 'react';
import { shallow } from 'enzyme';

import CreateBookForm from './form';
import { booksData } from '../../fixtures';
import { INITIALIZED } from '../../../api/status';
import { hooks } from '../../store/createBookForm';

jest.mock('../../store/createBookForm');

describe('<CreateBookForm />', () => {
  const defaultProps = {};
  const book = booksData[0];
  const state = { data: { book }, errors: {}, status: INITIALIZED };
  const onChangeAction = jest.fn();
  const onSubmitAction = jest.fn();

  beforeEach(() => {
    hooks.useEndpoint.mockImplementationOnce(() => state);

    hooks.useUpdateForm.mockImplementationOnce(() => onChangeAction);
    hooks.useSubmitForm.mockImplementationOnce(() => onSubmitAction);
  });

  it('should render a Book form', () => {
    const { data, errors, status } = state;
    const rendered = shallow(<CreateBookForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('BookForm');
    expect(rendered).toHaveProp({ data });
    expect(rendered).toHaveProp({ errors });
    expect(rendered).toHaveProp({ status });
    expect(rendered).toHaveProp({ onChangeAction });
    expect(rendered).toHaveProp({ onSubmitAction });
  });
});
