import React from 'react';
import { shallow } from 'enzyme';

import SelectSourceField, {
  mapSourceToValue,
  mapValueToSource,
} from './index';

import { hooks } from '../../store';

jest.mock('../../store');

describe('mapSourceToValue', () => {
  it('should be a function', () => {
    expect(typeof mapSourceToValue).toEqual('function');
  });

  describe('when the source does not exist', () => {
    const props = { data: {}, path: [] };

    it('should return an empty string', () => {
      expect(mapSourceToValue(props)).toEqual('');
    });
  });

  describe('when the source does not have an origin id', () => {
    const originType = 'Book';
    const source = { originType };
    const props = { data: { source }, path: [] };

    it('should return an empty string', () => {
      expect(mapSourceToValue(props)).toEqual('');
    });
  });

  describe('when the source does not have an origin type', () => {
    const originId = '00000000-0000-0000-0000-000000000000';
    const source = { originId };
    const props = { data: { source }, path: [] };

    it('should return an empty string', () => {
      expect(mapSourceToValue(props)).toEqual('');
    });
  });

  describe('when the source has an origin id and type', () => {
    const originId = '00000000-0000-0000-0000-000000000000';
    const originType = 'Book';
    const source = { originId, originType };
    const props = { data: { source }, path: [] };
    const expected = `${originType}:${originId}`;

    it('should join the origin id and type', () => {
      expect(mapSourceToValue(props)).toEqual(expected);
    });
  });

  describe('when the source has a nested path', () => {
    const originId = '00000000-0000-0000-0000-000000000000';
    const originType = 'Book';
    const source = { originId, originType };
    const data = { path: { to: { source } } };
    const props = { data, path: ['path', 'to'] };
    const expected = `${originType}:${originId}`;

    it('should join the origin id and type', () => {
      expect(mapSourceToValue(props)).toEqual(expected);
    });
  });
});

describe('mapValueToSource', () => {
  it('should be a function', () => {
    expect(typeof mapValueToSource).toEqual('function');
  });

  describe('with value: undefined', () => {
    const props = {};

    it('should return an empty object', () => {
      expect(mapValueToSource(props)).toEqual({ source: null });
    });
  });

  describe('with value: null', () => {
    const props = { value: null };

    it('should return an empty object', () => {
      expect(mapValueToSource(props)).toEqual({ source: null });
    });
  });

  describe('with value: an empty string', () => {
    const props = { value: '' };

    it('should return an empty object', () => {
      expect(mapValueToSource(props)).toEqual({ source: null });
    });
  });

  describe('with value: a string with missing origin id', () => {
    const originType = 'Book';
    const props = { value: `${originType}:` };

    it('should return an empty object', () => {
      expect(mapValueToSource(props)).toEqual({ source: null });
    });
  });

  describe('with value: a string with missing origin type', () => {
    const originId = '00000000-0000-0000-0000-000000000000';
    const props = { value: `:${originId}` };

    it('should return an empty object', () => {
      expect(mapValueToSource(props)).toEqual({ source: null });
    });
  });

  describe('with value: a string with origin id and type', () => {
    const originId = '00000000-0000-0000-0000-000000000000';
    const originType = 'Book';
    const props = { value: `${originType}:${originId}` };
    const expected = { source: { originId, originType } };

    it('should return a source stub', () => {
      expect(mapValueToSource(props)).toEqual(expected);
    });
  });
});

describe('<SelectSourceField />', () => {
  const id = 'spell-source-input';
  const value = 'Book:00000000-0000-0000-0000-000000000000';
  const onChange = jest.fn();
  const defaultProps = { id, value, onChange };
  const state = { data: {} };
  const requestData = jest.fn();

  beforeEach(() => {
    hooks.useData.mockImplementationOnce(() => state);
    hooks.useRequestData.mockImplementationOnce(() => requestData);
  });

  it('should render a select input', () => {
    const rendered = shallow(<SelectSourceField {...defaultProps} />);

    expect(rendered).toHaveDisplayName('FormSelectInput');
  });

  it('should request the data', () => {
    shallow(<SelectSourceField {...defaultProps} />);

    expect(requestData).toHaveBeenCalled();
  });

  it('should set the default option', () => {
    const rendered = shallow(<SelectSourceField {...defaultProps} />);

    expect(rendered).toHaveProp('defaultOption', 'Homebrew');
  });

  it('should set the options', () => {
    const rendered = shallow(<SelectSourceField {...defaultProps} />);
    const expected = [
      {
        label: 'Books',
        value: [],
      },
    ];

    expect(rendered).toHaveProp('options', expected);
  });

  it('should match the snapshot', () => {
    const rendered = shallow(<SelectSourceField {...defaultProps} />);

    expect(rendered).toMatchSnapshot();
  });

  describe('when there are many origins', () => {
    const books = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        title: 'The Fellowship of the Ring',
      },
      {
        id: '00000000-0000-0000-0000-000000000001',
        title: 'The Two Towers',
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        title: 'The Return of the King',
      },
    ];
    const data = { books };
    const expected = [
      {
        label: 'Books',
        value: [
          {
            label: 'The Fellowship of the Ring',
            value: 'Book:00000000-0000-0000-0000-000000000000',
          },
          {
            label: 'The Two Towers',
            value: 'Book:00000000-0000-0000-0000-000000000001',
          },
          {
            label: 'The Return of the King',
            value: 'Book:00000000-0000-0000-0000-000000000002',
          },
        ],
      },
    ];

    beforeEach(() => {
      hooks.useData.mockReset();
      hooks.useData.mockImplementationOnce(() => data);
    });

    it('should set the options', () => {
      const rendered = shallow(<SelectSourceField {...defaultProps} />);

      expect(rendered).toHaveProp('options', expected);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SelectSourceField {...defaultProps} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
