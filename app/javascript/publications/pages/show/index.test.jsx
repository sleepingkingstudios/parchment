import React from 'react';
import { shallow } from 'enzyme';

import ShowPublicationBreadcrumbs from './breadcrumbs';
import ShowPublicationPage from './index';
import { hooks } from '../../store/showFindPublication';

jest.mock('../../store/showFindPublication');

hooks.useRequestData.mockImplementation(() => () => {});

describe('ShowPublicationPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the Page', () => {
    const rendered = shallow(<ShowPublicationPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-show-publication');
    expect(rendered).toHaveProp('breadcrumbs', (<ShowPublicationBreadcrumbs />));
  });

  it('should render the heading', () => {
    const rendered = shallow(<ShowPublicationPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('ShowPublicationHeading');
  });

  it('should render the publication block', () => {
    const rendered = shallow(<ShowPublicationPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('ShowPublicationBlock');
  });

  it('should find the publication by id', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<ShowPublicationPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<ShowPublicationPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
