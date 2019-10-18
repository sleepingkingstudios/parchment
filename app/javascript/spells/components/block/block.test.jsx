import React from 'react';
import { shallow } from 'enzyme';

import SpellBlock from './block';
import { spellsData } from '../../fixtures';
import {
  formatComponents,
  formatSchoolAndLevel,
} from '../../utils';

const spell = spellsData[0];

describe('<SpellBlock />', () => {
  const defaultProps = { spell };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('spell-block');
  });

  it('should render the spell name', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const nameElement = rendered.find('.spell-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(spell.name);
  });

  it('should render the spell level and school', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const nameElement = rendered.find('.spell-block-level-school');
    const expected = formatSchoolAndLevel(spell);

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(expected);
  });

  it('should render the spell casting time', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const statBlock = rendered.find('.spell-block-stats');
    const castingTimeElement = statBlock.find('.spell-block-casting-time');

    expect(castingTimeElement).toHaveDisplayName('p');
    expect(castingTimeElement).toHaveText(`Casting Time: ${spell.castingTime}`);
  });

  it('should render the spell range', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const statBlock = rendered.find('.spell-block-stats');
    const rangeElement = statBlock.find('.spell-block-range');

    expect(rangeElement).toHaveDisplayName('p');
    expect(rangeElement).toHaveText(`Range: ${spell.range}`);
  });

  it('should render the spell components', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const statBlock = rendered.find('.spell-block-stats');
    const componentsElement = statBlock.find('.spell-block-components');
    const expected = formatComponents(spell, true);

    expect(componentsElement).toHaveDisplayName('p');
    expect(componentsElement).toHaveText(`Components: ${expected}`);
  });

  it('should render the spell duration', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const statBlock = rendered.find('.spell-block-stats');
    const durationElement = statBlock.find('.spell-block-duration');

    expect(durationElement).toHaveDisplayName('p');
    expect(durationElement).toHaveText(`Duration: ${spell.duration}`);
  });

  it('should render the spell description', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);
    const descriptionElement = rendered.find('PlainText');

    expect(descriptionElement).toExist();
    expect(descriptionElement).toHaveClassName('spell-block-description');
    expect(descriptionElement).toHaveProp('text', spell.description);
  });

  it('should be match the snapshot', () => {
    const rendered = shallow(<SpellBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with showAdditionalDetails: true', () => {
    const props = { ...defaultProps, showAdditionalDetails: true };

    it('should render the spell slug', () => {
      const rendered = shallow(<SpellBlock {...props} />);
      const statBlock = rendered.find('.spell-block-additional-details');
      const element = statBlock.find('.spell-block-slug');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText(`Slug: ${spell.slug}`);
    });

    it('should render the spell short description', () => {
      const rendered = shallow(<SpellBlock {...props} />);
      const statBlock = rendered.find('.spell-block-additional-details');
      const element = statBlock.find('.spell-block-short-description');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText(`Short Description: ${spell.shortDescription}`);
    });

    it('should be match the snapshot', () => {
      const rendered = shallow(<SpellBlock {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
