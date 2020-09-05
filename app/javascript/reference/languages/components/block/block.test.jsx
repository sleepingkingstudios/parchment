import React from 'react';
import { shallow } from 'enzyme';

import LanguageBlock from './block';
import { columns } from '../table';
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

  describe('with a language with a parent language', () => {
    const dialect = {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Invisible Box',
      slug: 'invisible-box',
      rarity: 'exotic',
      script: 'None',
      speakers: 'Mimes',
      parentLanguage: language,
    };

    it('should render the parent language link', () => {
      const rendered = shallow(<LanguageBlock {...defaultProps} data={dialect} />);
      const nameElement = rendered.find('.language-block-parent');
      const nameLink = nameElement.find('.language-block-parent-link');

      expect(nameElement).toHaveDisplayName('p');
      expect(nameElement).toHaveText(`Parent Language: ${language.name}`);

      expect(nameLink).toHaveDisplayName('Link');
      expect(nameLink).toHaveText(language.name);
      expect(nameLink).toHaveProp({ to: `/reference/languages/${language.slug}` });
    });
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

  describe('with showAssociations: true', () => {
    const message = 'There are no dialects matching the criteria';

    it('should render the language dialects', () => {
      const rendered = shallow(<LanguageBlock {...defaultProps} showAssociations />);
      const dialectsElement = rendered.find('.language-block-dialects');
      const dialectsTable = rendered.find('.language-block-dialects-table');

      expect(dialectsElement).toHaveDisplayName('div');

      expect(dialectsTable).toHaveDisplayName('DynamicTable');
      expect(dialectsTable).toHaveProp({ columns });
      expect(dialectsTable).toHaveProp({ data: [] });
      expect(dialectsTable).toHaveProp({ message });
    });

    describe('with a language with dialects', () => {
      const dialects = [
        {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Invisible Box',
          slug: 'invisible-box',
          rarity: 'exotic',
          script: 'None',
          speakers: 'Mimes',
          parentLanguage: language,
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Sad Face',
          slug: 'sad-face',
          rarity: 'common',
          script: 'None',
          speakers: 'Mimes',
          parentLanguage: language,
        },
        {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'The Robot',
          slug: 'robot',
          rarity: 'common',
          script: 'None',
          speakers: 'Mimes',
          parentLanguage: language,
        },
      ];
      const parentLanguage = Object.assign(
        {},
        language,
        { dialects },
      );

      it('should render the language dialects', () => {
        const rendered = shallow(
          <LanguageBlock {...defaultProps} data={parentLanguage} showAssociations />,
        );
        const dialectsElement = rendered.find('.language-block-dialects');
        const dialectsTable = rendered.find('.language-block-dialects-table');

        expect(dialectsElement).toHaveDisplayName('div');

        expect(dialectsTable).toHaveDisplayName('DynamicTable');
        expect(dialectsTable).toHaveProp({ columns });
        expect(dialectsTable).toHaveProp({ data: dialects });
        expect(dialectsTable).toHaveProp({ message });
      });
    });
  });
});
