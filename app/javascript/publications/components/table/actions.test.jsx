import React from 'react';
import { shallow } from 'enzyme';

import PublicationsTableActions from './actions';

describe('<SpellsTableActions />', () => {
  const defaultProps = { id: '00000000-0000-0000-0000-000000000000' };
  const { id } = defaultProps;

  it('should set the class name', () => {
    const rendered = shallow(<PublicationsTableActions {...defaultProps} />);

    expect(rendered).toHaveClassName('publication-actions');
  });

  it('should render the show link', () => {
    const rendered = shallow(<PublicationsTableActions {...defaultProps} />);
    const link = rendered.find('LinkButton').at(0);

    expect(link).toExist();
    expect(link).toHaveProp('url', `/publications/${id}`);
    expect(link).toHaveProp('children', 'Show');
  });

  it('should render the update link', () => {
    const rendered = shallow(<PublicationsTableActions {...defaultProps} />);
    const link = rendered.find('LinkButton').at(1);

    expect(link).toExist();
    expect(link).toHaveProp('url', `/publications/${id}/update`);
    expect(link).toHaveProp('children', 'Update');
  });
});
