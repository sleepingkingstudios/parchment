import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellPage from './page';
import { spellsData } from '../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../store/requestStatus';

describe('<ShowSpellPage />', () => {
  const requestFindSpell = jest.fn();
  const spellId = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id: spellId } };
  const props = {
    findSpellRequestStatus: INITIALIZED,
    match,
    requestFindSpell,
    spell: {},
  };
  const rendered = shallow(<ShowSpellPage {...props} />);
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
      label: 'Loading...',
      active: true,
    },
  ];

  it('should wrap the contents in a Page', () => {
    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should not render a spell block', () => {
    expect(rendered.find('SpellBlock')).not.toExist();
  });

  it('should show the loading message', () => {
    const message = 'Loading spell from the server...';

    expect(rendered.find('Page').shallow()).toIncludeText(message);
  });

  it('should call requestFindSpell()', () => {
    expect(requestFindSpell).toHaveBeenCalledWith(spellId);
  });

  describe('when the request status is PENDING', () => {
    const pendingProps = { ...props, findSpellRequestStatus: PENDING };
    const renderedPending = shallow(<ShowSpellPage {...pendingProps} />);

    it('should not render a spell block', () => {
      expect(renderedPending.find('SpellBlock')).not.toExist();
    });

    it('should show the loading message', () => {
      const message = 'Loading spell from the server...';

      expect(renderedPending.find('Page').shallow()).toIncludeText(message);
    });
  });

  describe('when the request status is FAILURE', () => {
    const failureProps = { ...props, findSpellRequestStatus: FAILURE };
    const renderedFailure = shallow(<ShowSpellPage {...failureProps} />);

    it('should not render a spell block', () => {
      expect(renderedFailure.find('SpellBlock')).not.toExist();
    });

    it('should show the failure message', () => {
      const message = 'Spell not found.';

      expect(renderedFailure.find('Page').shallow()).toIncludeText(message);
    });
  });

  describe('when the request status is SUCCESS', () => {
    const spell = spellsData[0];
    const successProps = { ...props, findSpellRequestStatus: SUCCESS, spell };
    const renderedSuccess = shallow(<ShowSpellPage {...successProps} />);
    const successBreadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Spells',
        url: '/spells',
      },
      {
        label: spell.name,
        active: true,
      },
    ];

    it('should update the breadcrumbs', () => {
      expect(renderedSuccess).toHaveProp('breadcrumbs', successBreadcrumbs);
    });

    it('should render the spell block', () => {
      const block = renderedSuccess.find('SpellBlock');

      expect(block).toExist();
      expect(block).toHaveProp('spell', spell);
    });
  });
});
