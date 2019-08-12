import React from 'react';
import { shallow } from 'enzyme';

import UpdateSpellPage from './page';
import { spellsData } from '../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../store/requestStatus';

describe('<UpdateSpellPage />', () => {
  const defaultProps = {
    spell: {},
    status: INITIALIZED,
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
      label: 'Loading...',
      active: true,
    },
  ];

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should not render a spell form', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered.find('Connect(SpellForm)')).not.toExist();
  });

  it('should show the loading message', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);
    const message = 'Loading spell from the server...';

    expect(rendered.find('Page').shallow()).toIncludeText(message);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<UpdateSpellPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('when the request status is PENDING', () => {
    const props = { ...defaultProps, status: PENDING };

    it('should not render a spell form', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);

      expect(rendered.find('Connect(SpellForm)')).not.toExist();
    });

    it('should show the loading message', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);
      const message = 'Loading spell from the server...';

      expect(rendered.find('Page').shallow()).toIncludeText(message);
    });
  });

  describe('when the request status is FAILURE', () => {
    const props = { ...defaultProps, status: FAILURE };

    it('should not render a spell form', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);

      expect(rendered.find('Connect(SpellForm)')).not.toExist();
    });

    it('should show the failure message', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);
      const message = 'Spell not found.';

      expect(rendered.find('Page').shallow()).toIncludeText(message);
    });
  });

  describe('when the request status is SUCCESS', () => {
    const spell = spellsData[0];
    const props = { ...defaultProps, status: SUCCESS, spell };
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
        url: `/spells/${spell.id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    it('should update the breadcrumbs', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);

      expect(rendered).toHaveProp('breadcrumbs', successBreadcrumbs);
    });

    it('should render the spell form', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);
      const block = rendered.find('Connect(SpellForm)');

      expect(block).toExist();
      expect(block).toHaveProp('isUpdate', true);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<UpdateSpellPage {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
