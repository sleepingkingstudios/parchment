import React from 'react';
import { shallow } from 'enzyme';

import CreateSpellPage from './page';

import { INITIALIZED } from '../../store/requestStatus';
import { spellsData } from '../fixtures';

describe('<CreateSpellPage />', () => {
  const requestCreateSpell = jest.fn();
  const updateSpellFormField = jest.fn();
  const defaultProps = {
    createSpellRequestStatus: INITIALIZED,
    draftSpell: spellsData[0],
    draftSpellErrors: { name: ["can't be blank"] },
    requestCreateSpell,
    updateSpellFormField,
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
      createSpellRequestStatus,
      draftSpell,
      draftSpellErrors,
    } = defaultProps;

    expect(form).toExist();
    expect(form).toHaveProp('onChangeAction', updateSpellFormField);
    expect(form).toHaveProp('onSubmitAction', requestCreateSpell);
    expect(form).toHaveProp('requestStatus', createSpellRequestStatus);
    expect(form).toHaveProp('errors', draftSpellErrors);
    expect(form).toHaveProp('spell', draftSpell);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
