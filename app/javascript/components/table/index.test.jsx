import React from 'react';
import { shallow } from 'enzyme';

import Table from './index';
import TableRow from './row';
import { columns, rocketsData } from './fixtures';

describe('<Table />', () => {
  const message = 'The waves that flow and dye the land gold.';
  const props = { columns, data: [], message };
  const rendered = shallow(<Table {...props} />);

  it('should wrap the contents in a <table> element', () => {
    expect(rendered).toHaveDisplayName('table');
  });

  it('should render the header', () => {
    expect(rendered.find('TableHeader')).toExist();
  });

  it('should render the empty message', () => {
    const emptyMessage = rendered.find('TableMessage');

    expect(emptyMessage).toExist();
    expect(emptyMessage).toHaveProp('columns', columns);
    expect(emptyMessage).toHaveProp('message', message);
  });

  describe('with a non-empty data array', () => {
    const propsWithData = Object.assign({}, props, { data: rocketsData });
    const renderedWithData = shallow(<Table {...propsWithData} />);

    it('should not render the empty message', () => {
      expect(renderedWithData.find('TableMessage')).not.toExist();
    });

    it('should include one <TableRow> element for each item', () => {
      expect(renderedWithData)
        .toContainMatchingElements(rocketsData.length, 'TableRow');
    });

    it('should render the item rows', () => {
      let expected;

      rocketsData.forEach((item) => {
        expected = (
          <TableRow columns={columns} item={item} />
        );

        expect(renderedWithData).toContainReact(expected);
      });
    });
  });
});
