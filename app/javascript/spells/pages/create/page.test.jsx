import React from 'react';
import { shallow } from 'enzyme';

import CreateSpellPage from './page';

describe('CreateSpellPage', () => {
  const defaultProps = {};
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
    },
    {
      label: 'Create',
      url: '/spells/create',
      active: true,
    },
  ];

  it('should render a Page', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-create-spell');
    expect(rendered).toHaveProp({ breadcrumbs });
  });

  it('should render the heading', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toHaveText('Create Spell');
  });

  it('should render the create Spell form', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);
    const form = rendered.find('CreateSpellForm');

    expect(form).toExist();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<CreateSpellPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
