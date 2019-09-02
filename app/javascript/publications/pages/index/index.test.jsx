import React from 'react';
import { shallow } from 'enzyme';

import PublicationsPage from './index';
import { hooks } from '../../store/indexFindPublications';

jest.mock('../../store/indexFindPublications');

hooks.useRequestData.mockImplementation(() => () => {});

describe('<PublicationsPage />', () => {
  const breadcrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Publications',
      url: '/publications',
      active: true,
    },
  ];
  const defaultProps = {};

  it('should wrap the contents in a Page', () => {
    const rendered = shallow(<PublicationsPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');

    expect(rendered).toHaveClassName('page-publications');
    expect(rendered).toHaveProp('breadcrumbs', breadcrumbs);
  });

  it('should render the publications table', () => {
    const rendered = shallow(<PublicationsPage {...defaultProps} />);

    const table = rendered.find('IndexPublicationsTable');

    expect(table).toExist();
  });

  it('should find the publications', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<PublicationsPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalled();
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PublicationsPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
