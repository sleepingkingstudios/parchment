import React from 'react';
import { shallow } from 'enzyme';

import ItemsIndexPageContent from './content';

describe('<ItemsIndexPageContent />', () => {
  const DefaultContent = () => (<div />);
  const Table = () => (<table />);
  const defaultProps = {
    DefaultContent,
    Table,
    data: [],
    other: 'other property',
  };

  describe('with default props', () => {
    const rendered = shallow(<ItemsIndexPageContent {...defaultProps} />);

    it('should render the navigation', () => {
      const navigation = rendered.find('PageNavigation');
      const expected = {
        Items: '/reference/items',
        'Magic Items': '/reference/items/magic-items',
      };

      expect(navigation).toExist();
      expect(navigation).toHaveClassName('items-navigation');
      expect(navigation).toHaveProp({ items: expected });
    });

    it('should render the content', () => {
      const content = rendered.find('DefaultContent');

      expect(content).toExist();
      expect(content).toHaveProp({ Table });
      expect(content).toHaveProp({ data: [] });
      expect(content).toHaveProp({ other: 'other property' });
    });

    it('should match the snapshot', () => {
      expect(rendered).toMatchSnapshot();
    });
  });
});
