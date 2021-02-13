import React from 'react';
import { shallow } from 'enzyme';

import DynamicTableEmptyMessage from './empty-message';

describe('<DynamicTableEmptyMessage />', () => {
  const message = 'There are no widgets matching the criteria.';
  const defaultProps = { message };

  describe('with default props', () => {
    it('should render the table empty message', () => {
      const rendered = shallow(<DynamicTableEmptyMessage {...defaultProps} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-empty-message');
      expect(rendered).toHaveClassName('col-12');
      expect(rendered).toHaveText(message);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTableEmptyMessage {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with message: an element', () => {
    const element = (<span>Something went wrong.</span>);

    it('should render the table empty message', () => {
      const rendered = shallow(<DynamicTableEmptyMessage {...defaultProps} message={element} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('dynamic-table-empty-message');
      expect(rendered).toHaveClassName('col-12');
      expect(rendered).toHaveProp('children', element);
      expect(rendered).toHaveText('Something went wrong.');
    });
  });
});
