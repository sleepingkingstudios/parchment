import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactDOMServer from 'react-dom/server';

import SpellBlock from './block';
import { spellsData } from '../fixtures';
import {
  formatComponents,
  formatSchoolAndLevel,
} from '../utils';

const spell = spellsData[0];

describe('<SpellBlock />', () => {
  const props = { spell };
  const rendered = shallow(<SpellBlock {...props} />);
  const statBlock = rendered.find('.spell-block-stats');

  it('should wrap the contents in a <div> element', () => {
    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('spell-block');
  });

  it('should set the data attribute', () => {
    const data = {
      'spell-id': spell.id,
      'spell-name': spell.name,
    };

    expect(rendered).toHaveProp('data', data);
  });

  it('should render the spell name', () => {
    const nameElement = rendered.find('.spell-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(spell.name);
  });

  it('should render the spell level and school', () => {
    const nameElement = rendered.find('.spell-block-level-school');
    const expected = formatSchoolAndLevel(spell);

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(expected);
  });

  it('should render the spell casting time', () => {
    const castingTimeElement = statBlock.find('.spell-block-casting-time');

    expect(castingTimeElement).toHaveDisplayName('p');
    expect(castingTimeElement).toHaveText(`Casting Time: ${spell.castingTime}`);
  });

  it('should render the spell range', () => {
    const rangeElement = statBlock.find('.spell-block-range');

    expect(rangeElement).toHaveDisplayName('p');
    expect(rangeElement).toHaveText(`Range: ${spell.range}`);
  });

  it('should render the spell components', () => {
    const componentsElement = statBlock.find('.spell-block-components');
    const expected = formatComponents(spell);

    expect(componentsElement).toHaveDisplayName('p');
    expect(componentsElement).toHaveText(`Components: ${expected}`);
  });

  it('should render the spell duration', () => {
    const durationElement = statBlock.find('.spell-block-duration');

    expect(durationElement).toHaveDisplayName('p');
    expect(durationElement).toHaveText(`Duration: ${spell.duration}`);
  });

  it('should render the spell description', () => {
    const descriptionElement = rendered.find('PlainText');

    expect(descriptionElement).toExist();
    expect(descriptionElement).toHaveClassName('spell-block-description');
    expect(descriptionElement).toHaveProp('text', spell.description);
  });

  it('should be consistent', () => {
    const snapshot = ReactDOMServer.renderToStaticMarkup(mount(<SpellBlock {...props} />));

    expect(snapshot).toMatchSnapshot();
  });
});
