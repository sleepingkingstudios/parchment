import React from 'react';
import { shallow } from 'enzyme';

import ActionsTableActions from './actions';

describe('<ActionsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should render the responsive actions', () => {
    const rendered = shallow(<ActionsTableActions {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ResponsiveActions');
    expect(rendered).toHaveProp({ baseUrl: '/mechanics/conditions' });
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ resourceName: 'condition' });
  });

  describe('with onDelete: function', () => {
    const onDelete = jest.fn();

    it('should render the responsive actions', () => {
      const rendered = shallow(<ActionsTableActions {...defaultProps} onDelete={onDelete} />);

      expect(rendered).toHaveDisplayName('ResponsiveActions');
      expect(rendered).toHaveProp({ baseUrl: '/mechanics/conditions' });
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ onDelete });
      expect(rendered).toHaveProp({ resourceName: 'condition' });
    });
  });
});
