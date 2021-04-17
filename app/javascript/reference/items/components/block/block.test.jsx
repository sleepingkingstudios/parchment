import React from 'react';
import { shallow } from 'enzyme';

import { valueOrDefault } from 'utils/object';
import ItemBlock from './block';

describe('<ItemBlock />', () => {
  const item = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Mummified Flumph Tentacle',
    slug: 'mummified-flumph-tentacle',
    cost: '1,000 pp',
    data: { holy: true },
    description: 'A relic of an ancient Flumph saint. Ramen.',
  };
  const defaultProps = { data: { item } };

  it('should wrap the contents in a <div> element', () => {
    const rendered = shallow(<ItemBlock {...defaultProps} />);

    expect(rendered).toHaveDisplayName('div');
    expect(rendered).toHaveClassName('item-block');
  });

  it('should render the item name', () => {
    const rendered = shallow(<ItemBlock {...defaultProps} />);
    const nameElement = rendered.find('.item-block-name');

    expect(nameElement).toHaveDisplayName('p');
    expect(nameElement).toIncludeText(item.name);
  });

  it('should render the item cost', () => {
    const rendered = shallow(<ItemBlock {...defaultProps} />);
    const costElement = rendered.find('.item-block-cost');

    expect(costElement).toHaveDisplayName('p');
    expect(costElement).toHaveText(`Cost: ${item.cost}`);
  });

  it('should render the item description', () => {
    const rendered = shallow(<ItemBlock {...defaultProps} />);
    const descriptionElement = rendered.find('RichText');

    expect(descriptionElement).toExist();
    expect(descriptionElement).toHaveClassName('item-block-description');
    expect(descriptionElement).toHaveProp('text', item.description);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<ItemBlock {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with showAdditionalDetails: true', () => {
    it('should render the item slug', () => {
      const rendered = shallow(
        <ItemBlock {...defaultProps} showAdditionalDetails />,
      );
      const slugElement = rendered.find('.item-block-slug');

      expect(slugElement).toExist();
      expect(slugElement).toHaveDisplayName('p');
      expect(slugElement).toHaveText(`Slug: ${item.slug}`);
    });

    it('should render the item data', () => {
      const rendered = shallow(
        <ItemBlock {...defaultProps} showAdditionalDetails />,
      );
      const dataElement = rendered.find('.item-block-data');

      expect(dataElement).toHaveDisplayName('p');
      expect(dataElement).toHaveText(`Data: ${JSON.stringify(item.data)}`);
    });

    it('should render the item short description', () => {
      const rendered = shallow(
        <ItemBlock {...defaultProps} showAdditionalDetails />,
      );
      const shortDescription = valueOrDefault(item.shortDescription, '');
      const shortDescriptionElement = rendered.find('.item-block-short-description');

      expect(shortDescriptionElement).toHaveDisplayName('p');
      expect(shortDescriptionElement).toHaveText(`Short Description: ${shortDescription}`);
    });

    it('should render the item type', () => {
      const rendered = shallow(<ItemBlock {...defaultProps} showAdditionalDetails />);
      const typeElement = rendered.find('.item-block-type');

      expect(typeElement).toHaveDisplayName('p');
      expect(typeElement).toHaveText('Type: (None)');
    });

    describe('when the item has a type', () => {
      const data = {
        item: { ...item, type: 'References::Items::Explosives' },
      };

      it('should render the item type', () => {
        const rendered = shallow(
          <ItemBlock {...defaultProps} showAdditionalDetails data={data} />,
        );
        const typeElement = rendered.find('.item-block-type');

        expect(typeElement).toHaveDisplayName('p');
        expect(typeElement).not.toHaveClassName('text-muted');
        expect(typeElement).toHaveText('Type: Explosives');
      });
    });
  });
});
