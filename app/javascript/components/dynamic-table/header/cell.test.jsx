import React from 'react';
import { shallow } from 'enzyme';

import DynamicTableHeaderCell from './cell';

describe('<DynamicTableHeaderCell />', () => {
  const defaultProps = { label: true, prop: 'propertyName' };

  describe('with default props', () => {
    it('should render the header cell', () => {
      const rendered = shallow(<DynamicTableHeaderCell {...defaultProps} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveClassName('dynamic-table-header-cell');
      expect(rendered).toHaveText('Property Name');
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<DynamicTableHeaderCell {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with header: false', () => {
    it('should render an empty component', () => {
      const rendered = shallow(<DynamicTableHeaderCell {...defaultProps} header={false} />);

      expect(rendered).toBeEmptyRender();
    });
  });

  describe('with label: false', () => {
    it('should render an empty header cell', () => {
      const rendered = shallow(<DynamicTableHeaderCell {...defaultProps} label={false} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveClassName('dynamic-table-header-cell');
      expect(rendered).toHaveText(' ');
    });
  });

  describe('with label: value', () => {
    const label = 'Custom Label';

    it('should render an empty header cell', () => {
      const rendered = shallow(<DynamicTableHeaderCell {...defaultProps} label={label} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveClassName('dynamic-table-header-cell');
      expect(rendered).toHaveText(label);
    });
  });

  describe('with resourceName: value', () => {
    const resourceName = 'widgets';

    it('should render the header cell', () => {
      const rendered = shallow(
        <DynamicTableHeaderCell {...defaultProps} resourceName={resourceName} />,
      );

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveClassName('dynamic-table-header-cell');
      expect(rendered).toHaveClassName('widgets-table-header-cell');
      expect(rendered).toHaveClassName('widgets-table-header-property-name-cell');
      expect(rendered).toHaveText('Property Name');
    });
  });

  describe('with resourceName: multiword value', () => {
    const resourceName = 'rocketParts';

    it('should render the header cell', () => {
      const rendered = shallow(
        <DynamicTableHeaderCell {...defaultProps} resourceName={resourceName} />,
      );

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('col');
      expect(rendered).toHaveClassName('dynamic-table-header-cell');
      expect(rendered).toHaveClassName('rocket-parts-table-header-cell');
      expect(rendered).toHaveClassName('rocket-parts-table-header-property-name-cell');
      expect(rendered).toHaveText('Property Name');
    });
  });

  describe('with width: value', () => {
    const width = 3;

    it('should render an empty header cell', () => {
      const rendered = shallow(<DynamicTableHeaderCell {...defaultProps} width={width} />);

      expect(rendered).toHaveDisplayName('div');
      expect(rendered).toHaveClassName('col-3');
      expect(rendered).toHaveClassName('dynamic-table-header-cell');
      expect(rendered).toHaveText('Property Name');
    });
  });
});
