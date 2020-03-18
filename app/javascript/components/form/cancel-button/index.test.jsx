import React from 'react';
import { shallow } from 'enzyme';

import FormCancelButton from './index';

describe('<FormCancelButton />', () => {
  const resourceName = 'Widget';
  const defaultProps = { form: { data: {} }, resourceName };

  it('should render the button', () => {
    const rendered = shallow(<FormCancelButton {...defaultProps} />);
    const url = '/widgets';

    expect(rendered).toHaveDisplayName('LinkButton');
    expect(rendered).toHaveProp('block', true);
    expect(rendered).toHaveProp('outline', true);
    expect(rendered).toHaveProp({ url });
    expect(rendered).toHaveProp('children', 'Cancel');
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<FormCancelButton {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('with baseUrl: value', () => {
    const baseUrl = '/path/to/resource';

    it('should render the button', () => {
      const rendered = shallow(
        <FormCancelButton {...defaultProps} baseUrl={baseUrl} />,
      );

      expect(rendered).toHaveDisplayName('LinkButton');
      expect(rendered).toHaveProp('block', true);
      expect(rendered).toHaveProp('outline', true);
      expect(rendered).toHaveProp({ url: baseUrl });
      expect(rendered).toHaveProp('children', 'Cancel');
    });

    describe('with isUpdate: true', () => {
      it('should render the button', () => {
        const id = '00000000-0000-0000-0000-000000000000';
        const form = { data: { id } };
        const rendered = shallow(
          <FormCancelButton {...defaultProps} baseUrl={baseUrl} form={form} isUpdate />,
        );
        const url = `${baseUrl}/${id}`;

        expect(rendered).toHaveDisplayName('LinkButton');
        expect(rendered).toHaveProp('block', true);
        expect(rendered).toHaveProp('outline', true);
        expect(rendered).toHaveProp({ url });
        expect(rendered).toHaveProp('children', 'Cancel');
      });
    });
  });

  describe('with isUpdate: true', () => {
    describe('when the data does not have an id', () => {
      it('should render the button', () => {
        const rendered = shallow(<FormCancelButton {...defaultProps} isUpdate />);
        const url = '/widgets';

        expect(rendered).toHaveDisplayName('LinkButton');
        expect(rendered).toHaveProp('block', true);
        expect(rendered).toHaveProp('outline', true);
        expect(rendered).toHaveProp({ url });
        expect(rendered).toHaveProp('children', 'Cancel');
      });
    });

    describe('when the data has an id', () => {
      it('should render the button', () => {
        const id = '00000000-0000-0000-0000-000000000000';
        const form = { data: { id } };
        const rendered = shallow(<FormCancelButton {...defaultProps} form={form} isUpdate />);
        const url = `/widgets/${id}`;

        expect(rendered).toHaveDisplayName('LinkButton');
        expect(rendered).toHaveProp('block', true);
        expect(rendered).toHaveProp('outline', true);
        expect(rendered).toHaveProp({ url });
        expect(rendered).toHaveProp('children', 'Cancel');
      });
    });

    describe('when the form has a path', () => {
      it('should render the button', () => {
        const id = '00000000-0000-0000-0000-000000000000';
        const form = { data: { widget: { id } }, path: ['widget'] };
        const rendered = shallow(<FormCancelButton {...defaultProps} form={form} isUpdate />);
        const url = `/widgets/${id}`;

        expect(rendered).toHaveDisplayName('LinkButton');
        expect(rendered).toHaveProp('block', true);
        expect(rendered).toHaveProp('outline', true);
        expect(rendered).toHaveProp({ url });
        expect(rendered).toHaveProp('children', 'Cancel');
      });
    });
  });
});
