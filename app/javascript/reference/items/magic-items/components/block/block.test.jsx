import React from 'react';
import { shallow } from 'enzyme';

import { valueOrDefault } from 'utils/object';
import MagicItemBlock from './block';
import { formatType } from '../../../utils';

describe('<MagicItemBlock />', () => {
  const magicItem = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Chimes of Crime',
    slug: 'chimes-of-crime',
    cost: '501-5,000 gp',
    category: 'wondrous item',
    rarity: 'rare',
    data: {
      category: 'wondrous item',
      rarity: 'rare',
    },
    description: 'A relic of an ancient Flumph saint. Ramen.',
    type: 'References::Items::MagicItem',
  };
  const defaultProps = { data: { magicItem } };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('magic-item-block');
  });

  it('should render the magic item name', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);
    const nameElement = rendered.find('.magic-item-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toIncludeText(magicItem.name);
  });

  it('should render the magic item category', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);
    const costElement = rendered.find('.magic-item-block-category');

    expect(costElement).toHaveDisplayName('p');
    expect(costElement).toHaveText(`Category: ${formatType(magicItem.category)}`);
  });

  it('should render the magic item cost', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);
    const costElement = rendered.find('.magic-item-block-cost');

    expect(costElement).toHaveDisplayName('p');
    expect(costElement).toHaveText(`Cost: ${magicItem.cost}`);
  });

  it('should render the magic item description', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);
    const descriptionElement = rendered.find('RichText');

    expect(descriptionElement).toExist();
    expect(descriptionElement).toHaveClassName('magic-item-block-description');
    expect(descriptionElement).toHaveProp('text', magicItem.description);
  });

  it('should render the magic item rarity', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);
    const costElement = rendered.find('.magic-item-block-rarity');

    expect(costElement).toHaveDisplayName('p');
    expect(costElement).toHaveText(`Rarity: ${formatType(magicItem.rarity)}`);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<MagicItemBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with showAdditionalDetails: true', () => {
    it('should render the magic item slug', () => {
      const rendered = shallow(
        <MagicItemBlock {...defaultProps} showAdditionalDetails />,
      );
      const slugElement = rendered.find('.magic-item-block-slug');

      expect(slugElement).toExist();
      expect(slugElement).toHaveDisplayName('p');
      expect(slugElement).toHaveText(`Slug: ${magicItem.slug}`);
    });

    it('should render the magic item data', () => {
      const rendered = shallow(
        <MagicItemBlock {...defaultProps} showAdditionalDetails />,
      );
      const dataElement = rendered.find('.magic-item-block-data');

      expect(dataElement).toHaveDisplayName('p');
      expect(dataElement).toHaveText(`Data: ${JSON.stringify(magicItem.data)}`);
    });

    it('should render the magic item short description', () => {
      const rendered = shallow(
        <MagicItemBlock {...defaultProps} showAdditionalDetails />,
      );
      const shortDescription = valueOrDefault(magicItem.shortDescription, '');
      const shortDescriptionElement = rendered.find('.magic-item-block-short-description');

      expect(shortDescriptionElement).toHaveDisplayName('p');
      expect(shortDescriptionElement).toHaveText(`Short Description: ${shortDescription}`);
    });

    it('should render the magic item type', () => {
      const rendered = shallow(<MagicItemBlock {...defaultProps} showAdditionalDetails />);
      const typeElement = rendered.find('.magic-item-block-type');

      expect(typeElement).toHaveDisplayName('p');
      expect(typeElement).toHaveText(`Type: ${formatType(magicItem.type)}`);
    });
  });
});
