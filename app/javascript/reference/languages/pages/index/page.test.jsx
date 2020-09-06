import React from 'react';
import { shallow } from 'enzyme';

import IndexLanguagesPage from './page';
import DynamicTable from '../../../../components/dynamic-table';
import { columns } from '../../components/table';
import endpoint from '../../store/indexFindLanguages';

describe('<IndexLanguagesPage />', () => {
  const defaultProps = {};

  it('should render the index page', () => {
    const rendered = shallow(<IndexLanguagesPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('IndexPage');
    expect(rendered).toHaveProp({ Table: DynamicTable });
    expect(rendered).toHaveProp({ columns });
    expect(rendered).toHaveProp({ endpoint });
    expect(rendered).toHaveProp({ resourceName: 'Language' });
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
        label: 'Languages',
        url: 'reference/languages',
        active: true,
      },
    ];
    const rendered = shallow(<IndexLanguagesPage {...defaultProps} />);

    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should set the buttons', () => {
    const buttons = [];
    const rendered = shallow(<IndexLanguagesPage {...defaultProps} />);

    expect(rendered).toHaveProp({ buttons });
  });
});
