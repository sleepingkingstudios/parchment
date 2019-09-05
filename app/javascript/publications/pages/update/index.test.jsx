import React from 'react';
import { shallow } from 'enzyme';

import UpdatePublicationBreadcrumbs from './breadcrumbs';
import UpdatePublicationPage from './index';
import { hooks } from '../../store/updateFindPublication';

jest.mock('../../store/updateFindPublication');

hooks.useRequestData.mockImplementation(() => () => {});

describe('UpdatePublicationPage', () => {
  const id = '00000000-0000-0000-0000-000000000000';
  const match = { params: { id } };
  const defaultProps = { match };

  it('should render the Page', () => {
    const rendered = shallow(<UpdatePublicationPage {...defaultProps} />);

    expect(rendered).toHaveDisplayName('Page');
    expect(rendered).toHaveClassName('page-update-publication');
    expect(rendered).toHaveProp('breadcrumbs', (<UpdatePublicationBreadcrumbs />));
  });

  it('should render the heading', () => {
    const rendered = shallow(<UpdatePublicationPage {...defaultProps} />);
    const heading = rendered.find('h1');

    expect(heading).toExist();
    expect(heading).toIncludeText('Update Publication');
  });

  it('should render the publication form', () => {
    const rendered = shallow(<UpdatePublicationPage {...defaultProps} />);

    expect(rendered).toContainMatchingElement('UpdatePublicationForm');
  });

  it('should find the publication by id', () => {
    const performRequest = jest.fn();

    hooks.useRequestData.mockImplementationOnce(() => performRequest);

    shallow(<UpdatePublicationPage {...defaultProps} />);

    expect(hooks.useRequestData).toHaveBeenCalledWith({ wildcards: { id } });
    expect(performRequest).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<UpdatePublicationPage {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });
});
