import React from 'react';
import { shallow } from 'enzyme';

import IndexSkillsPage from './page';
import DynamicTable from '../../../../components/dynamic-table';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindSkills';

describe('<IndexSkillsPage />', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexSkillsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ Table: DynamicTable });
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Skill' });
  });

  it('should set the breadcrumbs', () => {
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Reference',
        url: 'reference/',
        active: true,
      },
      {
        label: 'Skills',
        url: 'reference/skills',
        active: true,
      },
    ];
    const rendered = shallow(<IndexSkillsPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should set the buttons', () => {
    const buttons = [];
    const rendered = shallow(<IndexSkillsPage {...defaultProps} />);

    expect(rendered).toHaveProp({ buttons });
  });
});
