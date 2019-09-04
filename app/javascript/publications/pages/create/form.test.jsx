import React from 'react';
import { shallow } from 'enzyme';

import CreatePublicationForm from './form';
import { publicationsData } from '../../fixtures';
import { INITIALIZED } from '../../../api/status';
import { hooks } from '../../store/createPublicationForm';

jest.mock('../../store/createPublicationForm');

describe('<CreatePublicationForm />', () => {
  const defaultProps = {};
  const publication = publicationsData[0];
  const state = { data: { publication }, errors: {}, status: INITIALIZED };
  const onChangeAction = jest.fn();
  const onSubmitAction = jest.fn();

  beforeEach(() => {
    hooks.useEndpoint.mockImplementationOnce(() => state);

    hooks.useUpdateForm.mockImplementationOnce(() => onChangeAction);
    hooks.useSubmitForm.mockImplementationOnce(() => onSubmitAction);
  });

  it('should render a Publication form', () => {
    const { data, errors, status } = state;
    const rendered = shallow(<CreatePublicationForm {...defaultProps} />);

    expect(rendered).toHaveDisplayName('PublicationForm');
    expect(rendered).toHaveProp({ data });
    expect(rendered).toHaveProp({ errors });
    expect(rendered).toHaveProp({ status });
    expect(rendered).toHaveProp({ onChangeAction });
    expect(rendered).toHaveProp({ onSubmitAction });
  });
});
