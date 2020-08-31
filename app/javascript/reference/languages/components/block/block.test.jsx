import React from 'react';
import { shallow } from 'enzyme';

import LanguageBlock from './block';
import { capitalize } from '../../../../utils/string';

describe('<LanguageBlock />', () => {
  const language = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Body Language',
    slug: 'body-language',
    rarity: 'standard',
    script: 'None',
    speakers: 'Mimes',
  };
  const defaultProps = { data: language };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<LanguageBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('language-block');
  });

  it('should render the language name', () => {
    const rendered = shallow(<LanguageBlock {...defaultProps} />);
    const nameElement = rendered.find('.language-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toIncludeText(language.name);
  });

  it('should render the language rarity', () => {
    const rendered = shallow(<LanguageBlock {...defaultProps} />);
    const nameElement = rendered.find('.language-block-rarity');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(`Rarity: ${capitalize(language.rarity)}`);
  });

  it('should render the language script', () => {
    const rendered = shallow(<LanguageBlock {...defaultProps} />);
    const nameElement = rendered.find('.language-block-script');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(`Script: ${language.script}`);
  });

  it('should render the language speakers', () => {
    const rendered = shallow(<LanguageBlock {...defaultProps} />);
    const nameElement = rendered.find('.language-block-speakers');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(`Speakers: ${language.speakers}`);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<LanguageBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with showAdditionalDetails: true', () => {
    it('should render the language slug', () => {
      const rendered = shallow(
        <LanguageBlock {...defaultProps} showAdditionalDetails />,
      );
      const descriptionElement = rendered.find('.language-block-slug');

      expect(descriptionElement).toExist();
      expect(descriptionElement).toHaveDisplayName('p');
      expect(descriptionElement).toHaveText(`Slug: ${language.slug}`);
    });
  });
});
