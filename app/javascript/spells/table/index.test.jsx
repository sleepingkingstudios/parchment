import React from 'react';
import { shallow } from 'enzyme';

import Table from './index';
import { INITIALIZED } from '../../store/requestStatus';
import { spellsData } from '../fixtures';

describe('<Table />', () => {
  const props = { spells: spellsData, spellsRequestStatus: INITIALIZED };
  const rendered = shallow(<Table {...props} />);

  it('should wrap the contents in a <table> element', () => {
    expect(rendered).toHaveDisplayName('table');
  });

  it('should render the header', () => {
    expect(rendered.find('TableHeader')).toExist();
  });

  it('should render the body', () => {
    const body = rendered.find('TableBody');

    expect(body).toExist();
    expect(body).toHaveProp('spells', spellsData);
    expect(body).toHaveProp('spellsRequestStatus', INITIALIZED);
  });
});
