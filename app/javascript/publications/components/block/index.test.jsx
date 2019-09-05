import React from 'react';
import { shallow } from 'enzyme';

import PublicationBlock from './index';
import { publicationsData } from '../../fixtures';

const publication = publicationsData[0];

describe('<PublicationBlock />', () => {
  const defaultProps = { publication };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('publication-block');
  });

  it('should render the publication date', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);
    const statBlock = rendered.find('.publication-block-details');
    const element = statBlock.find('.publication-block-publication-date');

    expect(element).toHaveDisplayName('p');
    expect(element).toHaveText(`Publication Date: ${publication.publicationDate}`);
  });

  it('should render the publication name', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);
    const nameElement = rendered.find('.publication-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toHaveText(publication.name);
  });

  it('should render the publication publisher name', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);
    const statBlock = rendered.find('.publication-block-details');
    const element = statBlock.find('.publication-block-publisher-name');

    expect(element).toHaveDisplayName('p');
    expect(element).toHaveText(`Publisher: ${publication.publisherName}`);
  });

  it('should not render the publication abbreviation', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);
    const statBlock = rendered.find('.publication-block-additional-details');
    const element = statBlock.find('.publication-block-abbreviation');

    expect(element).not.toExist();
  });

  it('should not render the publication slug', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);
    const statBlock = rendered.find('.publication-block-additional-details');
    const element = statBlock.find('.publication-block-slug');

    expect(element).not.toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PublicationBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with a publication with official: false', () => {
    const unofficialPublication = { ...publication, official: false };
    const props = { ...defaultProps, publication: unofficialPublication };

    it('should render the publication official status', () => {
      const rendered = shallow(<PublicationBlock {...props} />);
      const statBlock = rendered.find('.publication-block-details');
      const element = statBlock.find('.publication-block-official');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText('Official: false');
    });
  });

  describe('with a publication with official: true', () => {
    const officialPublication = { ...publication, official: true };
    const props = { ...defaultProps, publication: officialPublication };

    it('should render the publication official status', () => {
      const rendered = shallow(<PublicationBlock {...props} />);
      const statBlock = rendered.find('.publication-block-details');
      const element = statBlock.find('.publication-block-official');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText('Official: true');
    });
  });

  describe('with a publication with playtest: false', () => {
    const nonPlaytestPublication = { ...publication, playtest: false };
    const props = { ...defaultProps, publication: nonPlaytestPublication };

    it('should render the publication playtest status', () => {
      const rendered = shallow(<PublicationBlock {...props} />);
      const statBlock = rendered.find('.publication-block-details');
      const element = statBlock.find('.publication-block-playtest');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText('Playtest: false');
    });
  });

  describe('with a publication with playtest: true', () => {
    const playtestPublication = { ...publication, playtest: true };
    const props = { ...defaultProps, publication: playtestPublication };

    it('should render the publication playtest status', () => {
      const rendered = shallow(<PublicationBlock {...props} />);
      const statBlock = rendered.find('.publication-block-details');
      const element = statBlock.find('.publication-block-playtest');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText('Playtest: true');
    });
  });

  describe('with showAdditionalDetails: true', () => {
    const props = { ...defaultProps, showAdditionalDetails: true };

    it('should render the publication abbreviation', () => {
      const rendered = shallow(<PublicationBlock {...props} />);
      const statBlock = rendered.find('.publication-block-additional-details');
      const element = statBlock.find('.publication-block-abbreviation');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText(`Abbreviation: ${publication.abbreviation}`);
    });

    it('should render the publication slug', () => {
      const rendered = shallow(<PublicationBlock {...props} />);
      const statBlock = rendered.find('.publication-block-additional-details');
      const element = statBlock.find('.publication-block-slug');

      expect(element).toHaveDisplayName('p');
      expect(element).toHaveText(`Slug: ${publication.slug}`);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<PublicationBlock {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
