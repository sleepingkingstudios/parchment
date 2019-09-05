import React from 'react';
import { shallow } from 'enzyme';

import ShowPublicationBreadcrumbs from './breadcrumbs';
import { hooks } from '../../store/showFindPublication';
import { publicationsData } from '../../fixtures';

jest.mock('../../store/showFindPublication');

describe('ShowPublicationBreadcrumbs', () => {
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
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { publication: {} } }));
    });

    it('should render the loading breadcrumbs', () => {
      const rendered = shallow(<ShowPublicationBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });

  describe('when the selector returns a publication', () => {
    const publication = publicationsData[0];
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
        active: true,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(fn => fn({ data: { publication } }));
    });

    it('should render the breadcrumbs for the publication', () => {
      const rendered = shallow(<ShowPublicationBreadcrumbs {...defaultProps} />);
      const breadcrumbs = rendered.find('Breadcrumbs');

      expect(rendered).toContainMatchingElement('Breadcrumbs');
      expect(breadcrumbs).toHaveProp('breadcrumbs', expected);
    });
  });
});
