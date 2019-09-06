import React from 'react';
import { shallow } from 'enzyme';

import ShowPublicationHeading from './heading';
import { hooks } from '../../store/showFindPublication';
import { hooks as deleteHooks } from '../../store/deletePublication';
import { publicationsData } from '../../fixtures';

jest.mock('../../store/deletePublication');
jest.mock('../../store/showFindPublication');

const deleteData = jest.fn();

describe('ShowPublicationHeading', () => {
  const defaultProps = {};

  describe('when the selector does not return a publication', () => {
    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: {} }));
    });

    it('should render the heading with no buttons', () => {
      const rendered = shallow(<ShowPublicationHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', []);
      expect(heading).toHaveProp('children', 'Show Publication');
    });
  });

  describe('when the selector returns a publication', () => {
    const publication = publicationsData[0];
    const expected = [
      {
        label: 'Update Publication',
        outline: true,
        url: `/publications/${publication.id}/update`,
      },
      {
        buttonStyle: 'danger',
        label: 'Delete Publication',
        outline: true,
        onClick: deleteData,
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => ({ data: { publication } }));

      deleteHooks.useDeleteData.mockImplementationOnce(() => deleteData);
    });

    it('should render the heading', () => {
      const rendered = shallow(<ShowPublicationHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(heading).toExist();
      expect(heading).toHaveProp('children', 'Show Publication');
    });

    it('should render the update and delete buttons', () => {
      const rendered = shallow(<ShowPublicationHeading {...defaultProps} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', expected);
    });
  });
});
