import React from 'react';
import { shallow } from 'enzyme';

import LanguagesTableActions from './actions';

describe('<LanguagesTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should render the responsive actions', () => {
    const rendered = shallow(<LanguagesTableActions {...defaultProps} />);

    expect(rendered).toHaveDisplayName('ResponsiveActions');
    expect(rendered).toHaveProp({ actions: ['show'] });
    expect(rendered).toHaveProp({ baseUrl: '/reference/languages' });
    expect(rendered).toHaveProp({ id });
    expect(rendered).toHaveProp({ resourceName: 'language' });
  });
});
