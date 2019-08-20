import React from 'react';
import { shallow } from 'enzyme';

import ShowSpellBlock from './block';
import { SpellBlock } from '../../components/block';
import { spellsData } from '../../fixtures';
import {
  INITIALIZED,
  PENDING,
  FAILURE,
  SUCCESS,
} from '../../../store/requestStatus';

describe('ShowSpellBlock', () => {
  const defaultProps = { spell: {}, status: INITIALIZED };

  describe('with status: INITIALIZED', () => {
    const props = { ...defaultProps, status: INITIALIZED };

    it('should display the pending message', () => {
      const wrapper = shallow(<ShowSpellBlock {...props} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderInitialized')();
      const { status } = props;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: FAILURE', () => {
    const props = { ...defaultProps, status: FAILURE };

    it('should display the failure message', () => {
      const wrapper = shallow(<ShowSpellBlock {...props} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderFailure')();
      const { status } = props;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Unable to load spell from the server.');
    });
  });

  describe('with status: PENDING', () => {
    const props = { ...defaultProps, status: PENDING };

    it('should display the pending message', () => {
      const wrapper = shallow(<ShowSpellBlock {...props} />);
      const rendered = wrapper.find('LoaderSwitch').renderProp('renderPending')();
      const { status } = props;

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ status });

      expect(rendered).toHaveDisplayName('p');
      expect(rendered).toHaveText('Loading spell from the server...');
    });
  });

  describe('with status: SUCCESS', () => {
    const props = { ...defaultProps, spell: spellsData[0], status: SUCCESS };

    it('should render the Spell block', () => {
      const { spell, status } = props;
      const wrapper = shallow(<ShowSpellBlock {...props} />);
      const rendered = wrapper
        .find('LoaderSwitch')
        .renderProp('renderSuccess')({ spell });

      expect(wrapper).toHaveDisplayName('LoaderSwitch');
      expect(wrapper).toHaveProp({ spell, status });

      expect(rendered).toMatchElement(<SpellBlock spell={spell} />);
    });
  });
});
