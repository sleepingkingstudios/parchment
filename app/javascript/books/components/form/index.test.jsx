import React from 'react';
import { shallow } from 'enzyme';

import BookForm from './index';

import { booksData } from '../../fixtures';
import { INITIALIZED } from '../../../api/status';

describe('<BookForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const data = { book: booksData[0] };
  const errors = {};
  const defaultProps = {
    data,
    onChangeAction,
    onSubmitAction,
    status: INITIALIZED,
    errors,
  };
  const form = {
    data,
    errors,
    path: ['book'],
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the title field', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);
    const input = rendered.find('TitleField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the slug field', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);
    const input = rendered.find('SlugField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the publisher name field', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);
    const input = rendered.find('PublisherNameField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the publication date field', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);
    const input = rendered.find('PublicationDateField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the cancel button', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);
    const input = rendered.find('CancelButton');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);
    const input = rendered.find('SubmitButton');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<BookForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
