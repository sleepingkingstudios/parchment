import React from 'react';
import { shallow } from 'enzyme';

import SelectSpellSourceInput from './index';
import { publicationsData } from '../../../../publications/fixtures';
import { hooks } from '../../../store/formFindSources';

jest.mock('../../../store/formFindSources');

describe('<SelectSpellSourceInput />', () => {
  const id = 'spell-source';
  const onChange = jest.fn();
  const defaultProps = { id, onChange };

  describe('with no sources', () => {
    const value = '';
    const props = { ...defaultProps, value };
    const state = { data: {} };
    const expectedOptions = [];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the select input', () => {
      const rendered = shallow(<SelectSpellSourceInput {...props} />);
      const defaultOption = 'Homebrew';

      expect(rendered).toHaveDisplayName('FormSelectInput');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ defaultOption });
      expect(rendered).toHaveProp({ onChange });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp('options', expectedOptions);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SelectSpellSourceInput {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });

  describe('with many sources', () => {
    const value = `Publication ${publicationsData[0].id}`;
    const props = { ...defaultProps, value };
    const state = { data: { publications: publicationsData } };
    const expectedOptions = [
      {
        label: 'Publications',
        value: publicationsData.map(publication => ({
          label: publication.name,
          value: `Publication ${publication.id}`,
        })),
      },
    ];

    beforeEach(() => {
      hooks.useEndpoint.mockImplementationOnce(() => state);
    });

    it('should display the select input', () => {
      const rendered = shallow(<SelectSpellSourceInput {...props} />);
      const defaultOption = 'Homebrew';

      expect(rendered).toHaveDisplayName('FormSelectInput');
      expect(rendered).toHaveProp({ id });
      expect(rendered).toHaveProp({ defaultOption });
      expect(rendered).toHaveProp({ onChange });
      expect(rendered).toHaveProp({ value });
      expect(rendered).toHaveProp('options', expectedOptions);
    });

    it('should match the snapshot', () => {
      const rendered = shallow(<SelectSpellSourceInput {...props} />);

      expect(rendered).toMatchSnapshot();
    });
  });
});
