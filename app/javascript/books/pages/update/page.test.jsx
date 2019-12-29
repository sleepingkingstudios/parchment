import React from 'react';
import { shallow } from 'enzyme';

import UpdateBookBreadcrumbs from './breadcrumbs';
import UpdateBookPage from './page';
import { hooks } from '../../store/updateFindBook';

jest.mock('../../store/updateFindBook');

hooks.useRequestData.mockImplementation(() => () => {});

describe('<UpdateBookPage />', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the Page', () => {
    const rendered = shallow(<UpdateBookPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-update-book');
    expect(rendered).toHaveProp('breadcrumbs', (<UpdateBookBreadcrumbs />));
  });

  it('should render the heading', () => {
    const rendered = shallow(<UpdateBookPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toIncludeText('Update Book');
  });

  it('should find the book by id', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<UpdateBookPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<UpdateBookPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
