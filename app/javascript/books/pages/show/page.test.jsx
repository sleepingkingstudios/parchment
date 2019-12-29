import React from 'react';
import { shallow } from 'enzyme';

import ShowBookBreadcrumbs from './breadcrumbs';
import ShowBookPage from './page';
import { hooks } from '../../store/showFindBook';

jest.mock('../../store/showFindBook');

hooks.useRequestData.mockImplementation(() => () => {});

describe('<ShowBookPage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the Page', () => {
    const rendered = shallow(<ShowBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-show-book');
    expect(rendered).toHaveProp('breadcrumbs', (<ShowBookBreadcrumbs />));
  });

  it('should render the heading', () => {
    const rendered = shallow(<ShowBookPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('ShowBookHeading');
  });

  it('should render the spell block', () => {
    const rendered = shallow(<ShowBookPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('ShowBookBlock');
  });

  it('should find the book by id', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<ShowBookPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<ShowBookPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
