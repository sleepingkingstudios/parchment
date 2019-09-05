import React from 'react';
import { shallow } from 'enzyme';

import UpdatePublicationBreadcrumbs from './breadcrumbs';
import { hooks } from '../../store/updateFindPublication';
import { publicationsData } from '../../fixtures';

jest.mock('../../store/updateFindPublication');

describe('UpdatePublicationBreadcrumbs', () => {
  const defaultProps = {};

  describe('when the selector does not return a publication', () => {
    const expected = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Publications',
        url: '/publications',
      },
      {
        label: 'Loading...',
        url: null,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { publication: {} } }));
    });

    it('should render the loading breadcrumbs', () => {
      const rendered = shallow(<UpdatePublicationBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });

  describe('when the selector returns a publication', () => {
    const publication = publicationsData[0];
    const { id } = publication;
    const expected = [
      {
        label: 'Home',
        url: '/',
      },
      {
        label: 'Publications',
        url: '/publications',
      },
      {
        label: publication.name,
        url: `/publications/${id}`,
      },
      {
        label: 'Update',
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { publication } }));
    });

    it('should render the breadcrumbs for the publication', () => {
      const rendered = shallow(<UpdatePublicationBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });
});
