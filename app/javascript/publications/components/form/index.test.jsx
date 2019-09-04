import React from 'react';
import { shallow } from 'enzyme';

import PublicationForm from './index';

import { publicationsData } from '../../fixtures';
import { INITIALIZED } from '../../../api/status';

describe('<PublicationForm />', () => {
  const onChangeAction = jest.fn(
    ({ propName, value }) => ({ payload: { propName, value } }),
  );
  const onSubmitAction = jest.fn(() => ({ ok: true }));
  const data = { publication: publicationsData[0] };
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
    path: ['publication'],
    onChangeAction,
    onSubmitAction,
  };

  it('should render a form', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Form');
    expect(rendered).toHaveProp({ form });
  });

  it('should render the name input field', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('NameField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the publisher name input field', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('PublisherNameField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the publication date input field', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('PublicationDateField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the slug input field', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('SlugField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the abbreviation input field', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('AbbreviationField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the playtest checkbox', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('PlaytestField');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the cancel button', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('CancelButton');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should render the submit button', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);
    const input = rendered.find('SubmitButton');

    expect(input).toExist();
    expect(input).toHaveProp({ form });
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PublicationForm {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
