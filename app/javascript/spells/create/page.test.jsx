import React from 'react';
import { shallow } from 'enzyme';

import CreateSpellPage from './page';

import { INITIALIZED } from '../../store/requestStatus';
import { spellsData } from '../fixtures';

describe('<CreateSpellPage />', () => {
  const requestSubmitForm = jest.fn();
  const updateFormField = jest.fn();
  const defaultProps = {
    data: spellsData[0],
    errors: { name: ["can't be blank"] },
    requestSubmitForm,
    status: INITIALIZED,
    updateFormField,
  };
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
    },
    {
      label: 'Create',
      url: '/spells/create',
      active: true,
    },
  ];

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should render the spell form', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);
    const form = rendered.find('SpellForm');
    const {
      data,
      errors,
      status,
    } = defaultProps;

    expect(form).toExist();
    expect(form).toHaveProp('onChangeAction', updateFormField);
    expect(form).toHaveProp('onSubmitAction', requestSubmitForm);
    expect(form).toHaveProp('data', data);
    expect(form).toHaveProp('errors', errors);
    expect(form).toHaveProp('requestStatus', status);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
