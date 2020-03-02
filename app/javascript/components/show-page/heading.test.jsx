import React from 'react';
import { shallow } from 'enzyme';

import ShowPageHeading from './heading';

describe('<ShowPageHeading />', () => {
  const defaultProps = {
    deleteEndpoint: { hooks: { useDeleteData: () => {} } },
    id: '00000000-0000-0000-0000-000000000000',
    resourceName: 'Widget',
  };

  it('should render the heading with no buttons', () => {
    const rendered = shallow(<ShowPageHeading {...defaultProps} />);
    const heading = rendered.find('HeadingWithButtons');

    expect(rendered).toContainMatchingElement('HeadingWithButtons');
    expect(heading).toHaveProp('buttons', []);
    expect(heading).toHaveProp('children', 'Show Widget');
  });

  describe('with buttons: array', () => {
    const buttons = [
      {
        label: 'The Void',
        url: '/dev/null',
      },
    ];

    it('should render the heading with the given buttons', () => {
      const rendered = shallow(<ShowPageHeading {...defaultProps} buttons={buttons} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', buttons);
      expect(heading).toHaveProp('children', 'Show Widget');
    });
  });

  describe('with resource: object', () => {
    const { id } = defaultProps;
    const resource = { id };
    const deleteData = jest.fn();
    const useDeleteData = jest.fn(() => deleteData);
    const deleteEndpoint = { hooks: { useDeleteData } };
    const expected = [
      {
        label: 'Update Widget',
        outline: true,
        url: `/widgets/${id}/update`,
      },
      {
        buttonStyle: 'danger',
        label: 'Delete Widget',
        outline: true,
        onClick: deleteData,
      },
    ];

    it('should render the heading', () => {
      const rendered = shallow(<ShowPageHeading {...defaultProps} resource={resource} />);
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('children', 'Show Widget');
    });

    it('should render the update and delete buttons', () => {
      const rendered = shallow(
        <ShowPageHeading {...defaultProps} deleteEndpoint={deleteEndpoint} resource={resource} />,
      );
      const heading = rendered.find('HeadingWithButtons');

      expect(rendered).toContainMatchingElement('HeadingWithButtons');
      expect(heading).toHaveProp('buttons', expected);

      expect(useDeleteData).toHaveBeenCalledWith({ wildcards: { id } });
    });
  });
});
