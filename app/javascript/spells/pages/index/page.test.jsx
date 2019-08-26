import React from 'react';
import { shallow } from 'enzyme';

import SpellsPage from './page';
import { hooks } from '../../store/indexFindSpells';

jest.mock('../../store/indexFindSpells');

hooks.usePerformRequest.mockImplementation(() => () => {});

describe('<SpellsPage />', () => {
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Spells',
      url: '/spells',
      active: true,
    },
  ];
  const defaultProps = {};

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-spells');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should render the spells table', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    const table = rendered.find('IndexSpellsTable');

    expect(table).toExist();
  });

  it('should find the spells', () => {
    const performRequest = jest.fn();

    hooks.usePerformRequest.mockImplementationOnce(() => performRequest);

    shallow(<SpellsPage {...defaultProps} />);

    expect(hooks.usePerformRequest).toHaveBeenCalled();
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SpellsPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
