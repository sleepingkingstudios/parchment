import React from 'react';
import { shallow } from 'enzyme';

import PublicationFormCancelButton from './index';

import { publicationsData } from '../../../fixtures';

describe('<PublicationFormCancelButton />', () => {
  const publication = publicationsData[0];
  const form = { data: { publication } };
  const defaultProps = {
    form,
    isUpdate: false,
  };

  it('should render the button', () => {
    const rendered = shallow(<PublicationFormCancelButton {...defaultProps} />);
    const url = '/publications';

    expect(rendered).toHaveDisplayName('LinkButton');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('outline', true);
    expect(rendered).toHaveProp({ url });
    expect(rendered).toHaveProp('children', 'Cancel');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<PublicationFormCancelButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with isUpdate: true', () => {
    const props = { ...defaultProps, isUpdate: true };

    it('should render the button', () => {
      const rendered = shallow(<PublicationFormCancelButton {...props} />);
      const url = `/publications/${publication.id}`;

      expect(rendered).toHaveDisplayName('LinkButton');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('outline', true);
      expect(rendered).toHaveProp({ url });
      expect(rendered).toHaveProp('children', 'Cancel');
    });
  });
});
